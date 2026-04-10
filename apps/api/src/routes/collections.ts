import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, error, notFound, serverError } from '../utils/response'
import { slugify } from '../utils/slugify'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'
import { applyTransforms } from '../services/cloudinary.service'

const collectionsRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/collections
  fastify.get('/', { schema: { tags: ['Collections'] } }, async (request, reply) => {
    try {
      const cached = await cache.get(CacheKeys.collections)
      if (cached) return success(reply, cached)

      const collections = await fastify.prisma.collection.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { _count: { select: { items: true } } },
      })
      await cache.set(CacheKeys.collections, collections, TTL.collections)
      return success(reply, collections)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/collections/:slug
  fastify.get('/:slug', {
    schema: { tags: ['Collections'], params: { type: 'object', properties: { slug: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string }
      const cacheKey = CacheKeys.collection(slug)
      const cached = await cache.get(cacheKey)
      if (cached) return success(reply, cached)

      const collection = await fastify.prisma.collection.findUnique({
        where: { slug },
        include: {
          items: {
            include: {
              product: { include: { category: true } },
            },
            orderBy: { sortOrder: 'asc' },
          },
        },
      })
      if (!collection) return notFound(reply, 'Collection')

      const transformed = {
        ...collection,
        items: collection.items.map((item) => ({
          ...item,
          product: {
            ...item.product,
            images: Array.isArray(item.product.images)
              ? (item.product.images as Array<{ url: string; alt: string; isPrimary: boolean }>).map((img) => ({
                  ...img,
                  url: applyTransforms(img.url),
                }))
              : item.product.images,
            price: item.product.price.toString(),
            salePrice: item.product.salePrice?.toString() ?? null,
            weight: item.product.weight?.toString() ?? null,
          },
        })),
      }

      await cache.set(cacheKey, transformed, TTL.collections)
      return success(reply, transformed)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/collections
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Collections'],
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          slug: { type: 'string' },
          description: { type: 'string' },
          bannerImage: { type: 'string' },
          featured: { type: 'boolean' },
          sortOrder: { type: 'integer' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const slug = (body.slug as string) || slugify(body.name as string)
      const existing = await fastify.prisma.collection.findUnique({ where: { slug } })
      if (existing) return error(reply, 'Collection with this slug already exists', 409)

      const collection = await fastify.prisma.collection.create({
        data: {
          name: body.name as string,
          slug,
          description: body.description as string | undefined,
          bannerImage: body.bannerImage as string | undefined,
          featured: (body.featured as boolean) ?? false,
          sortOrder: (body.sortOrder as number) ?? 0,
        },
      })

      await cache.del(CacheKeys.collections)
      return success(reply, collection, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/collections/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Collections'], params: { type: 'object', properties: { id: { type: 'string' } } }, body: { type: 'object' } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>
      const existing = await fastify.prisma.collection.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Collection')

      const updated = await fastify.prisma.collection.update({
        where: { id },
        data: {
          ...(body.name ? { name: body.name as string } : {}),
          ...(body.slug ? { slug: body.slug as string } : {}),
          ...(body.description !== undefined ? { description: body.description as string } : {}),
          ...(body.bannerImage !== undefined ? { bannerImage: body.bannerImage as string } : {}),
          ...(body.featured !== undefined ? { featured: body.featured as boolean } : {}),
          ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder as number } : {}),
        },
      })

      await cache.del(CacheKeys.collections, CacheKeys.collection(updated.slug))
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/collections/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Collections'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.collection.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Collection')
      await fastify.prisma.collection.delete({ where: { id } })
      await cache.del(CacheKeys.collections, CacheKeys.collection(existing.slug))
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/collections/:id/products
  fastify.post('/:id/products', {
    preHandler: authenticate,
    schema: {
      tags: ['Collections'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: { type: 'string' },
          sortOrder: { type: 'integer' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { id: collectionId } = request.params as { id: string }
      const { productId, sortOrder } = request.body as { productId: string; sortOrder?: number }

      const item = await fastify.prisma.collectionProduct.upsert({
        where: { collectionId_productId: { collectionId, productId } },
        update: { sortOrder: sortOrder ?? 0 },
        create: { collectionId, productId, sortOrder: sortOrder ?? 0 },
      })

      const col = await fastify.prisma.collection.findUnique({ where: { id: collectionId } })
      if (col) await cache.del(CacheKeys.collection(col.slug))

      return success(reply, item, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/collections/:id/products/:pid
  fastify.delete('/:id/products/:pid', {
    preHandler: authenticate,
    schema: {
      tags: ['Collections'],
      params: { type: 'object', properties: { id: { type: 'string' }, pid: { type: 'string' } } },
    },
  }, async (request, reply) => {
    try {
      const { id: collectionId, pid: productId } = request.params as { id: string; pid: string }

      await fastify.prisma.collectionProduct.delete({
        where: { collectionId_productId: { collectionId, productId } },
      })

      const col = await fastify.prisma.collection.findUnique({ where: { id: collectionId } })
      if (col) await cache.del(CacheKeys.collection(col.slug))

      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default collectionsRoutes
