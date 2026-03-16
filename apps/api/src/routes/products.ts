import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, error, notFound, serverError } from '../utils/response'
import { parsePagination, buildMeta } from '../utils/pagination'
import { slugify } from '../utils/slugify'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'
import { applyTransforms } from '../services/cloudinary.service'
import type { Prisma } from '@prisma/client'

const productsRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/products
  fastify.get('/', {
    schema: {
      tags: ['Products'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 12 },
          search: { type: 'string' },
          category: { type: 'string' },
          collection: { type: 'string' },
          featured: { type: 'boolean' },
          newArrival: { type: 'boolean' },
          inStock: { type: 'boolean' },
          sort: { type: 'string', enum: ['name', 'price', 'createdAt', 'sortOrder'] },
          order: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const query = request.query as Record<string, string | boolean | undefined>
      const cacheKey = CacheKeys.products(JSON.stringify(query))
      const cached = await cache.get(cacheKey)
      if (cached) return success(reply, (cached as { products: unknown[] }).products, 200, (cached as { meta: Parameters<typeof success>[3] }).meta)

      const { page, limit, skip } = parsePagination(query)

      const where: Prisma.ProductWhereInput = {
        publishedAt: { not: null },
      }

      if (query.search) {
        where.OR = [
          { name: { contains: String(query.search), mode: 'insensitive' } },
          { description: { contains: String(query.search), mode: 'insensitive' } },
          { tags: { has: String(query.search) } },
        ]
      }

      if (query.category) {
        where.category = { slug: String(query.category) }
      }

      if (query.collection) {
        where.collectionItems = { some: { collection: { slug: String(query.collection) } } }
      }

      if (query.featured !== undefined) {
        where.featured = query.featured === true || query.featured === 'true'
      }

      if (query.newArrival !== undefined) {
        where.newArrival = query.newArrival === true || query.newArrival === 'true'
      }

      if (query.inStock !== undefined) {
        where.inStock = query.inStock === true || query.inStock === 'true'
      }

      const sortField = (query.sort as string) || 'sortOrder'
      const sortOrder = (query.order as string) || 'asc'

      const [products, total] = await Promise.all([
        fastify.prisma.product.findMany({
          where,
          include: { category: true },
          orderBy: { [sortField]: sortOrder },
          skip,
          take: limit,
        }),
        fastify.prisma.product.count({ where }),
      ])

      // Apply Cloudinary transforms to image URLs
      const transformedProducts = products.map((p) => ({
        ...p,
        images: Array.isArray(p.images)
          ? (p.images as Array<{ url: string; alt: string; isPrimary: boolean }>).map((img) => ({
              ...img,
              url: applyTransforms(img.url),
            }))
          : p.images,
        price: p.price.toString(),
        salePrice: p.salePrice?.toString() ?? null,
        weight: p.weight?.toString() ?? null,
      }))

      const meta = buildMeta(total, page, limit)
      const responseData = { products: transformedProducts }
      await cache.set(cacheKey, { ...responseData, meta }, TTL.products)

      return success(reply, transformedProducts, 200, meta)
    } catch (err) {
      fastify.log.error(err)
      return serverError(reply, err)
    }
  })

  // GET /api/products/:slug
  fastify.get('/:slug', {
    schema: {
      tags: ['Products'],
      params: { type: 'object', properties: { slug: { type: 'string' } } },
    },
  }, async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string }

      const product = await fastify.prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          collectionItems: { include: { collection: true }, orderBy: { sortOrder: 'asc' } },
        },
      })

      if (!product) return notFound(reply, 'Product')

      const transformed = {
        ...product,
        images: Array.isArray(product.images)
          ? (product.images as Array<{ url: string; alt: string; isPrimary: boolean }>).map((img) => ({
              ...img,
              url: applyTransforms(img.url),
            }))
          : product.images,
        price: product.price.toString(),
        salePrice: product.salePrice?.toString() ?? null,
        weight: product.weight?.toString() ?? null,
      }

      return success(reply, transformed)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/products
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Products'],
      body: {
        type: 'object',
        required: ['name', 'description', 'price', 'sku', 'categoryId'],
        properties: {
          name: { type: 'string', minLength: 1 },
          slug: { type: 'string' },
          description: { type: 'string' },
          shortDesc: { type: 'string' },
          price: { type: 'number', minimum: 0 },
          salePrice: { type: 'number', minimum: 0 },
          sku: { type: 'string' },
          inStock: { type: 'boolean' },
          featured: { type: 'boolean' },
          newArrival: { type: 'boolean' },
          images: { type: 'array' },
          categoryId: { type: 'string' },
          materials: { type: 'array', items: { type: 'string' } },
          colors: { type: 'array', items: { type: 'string' } },
          finishes: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { type: 'string' } },
          metaTitle: { type: 'string' },
          metaDesc: { type: 'string' },
          sortOrder: { type: 'integer' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const slug = (body.slug as string) || slugify(body.name as string)

      const existing = await fastify.prisma.product.findUnique({ where: { slug } })
      if (existing) return error(reply, 'Product with this slug already exists', 409)

      const product = await fastify.prisma.product.create({
        data: {
          name: body.name as string,
          slug,
          description: body.description as string,
          shortDesc: body.shortDesc as string | undefined,
          price: body.price as number,
          salePrice: body.salePrice as number | undefined,
          sku: body.sku as string,
          inStock: (body.inStock as boolean) ?? true,
          featured: (body.featured as boolean) ?? false,
          newArrival: (body.newArrival as boolean) ?? false,
          images: (body.images as object[]) || [],
          categoryId: body.categoryId as string,
          materials: (body.materials as string[]) || [],
          colors: (body.colors as string[]) || [],
          finishes: (body.finishes as string[]) || [],
          tags: (body.tags as string[]) || [],
          metaTitle: body.metaTitle as string | undefined,
          metaDesc: body.metaDesc as string | undefined,
          sortOrder: (body.sortOrder as number) ?? 0,
        },
        include: { category: true },
      })

      await cache.delPattern('products:*')

      return success(reply, product, 201)
    } catch (err) {
      fastify.log.error(err)
      return serverError(reply, err)
    }
  })

  // PUT /api/products/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Products'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { type: 'object' },
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>

      const existing = await fastify.prisma.product.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Product')

      const updated = await fastify.prisma.product.update({
        where: { id },
        data: {
          ...(body.name && { name: body.name as string }),
          ...(body.slug && { slug: body.slug as string }),
          ...(body.description !== undefined && { description: body.description as string }),
          ...(body.shortDesc !== undefined && { shortDesc: body.shortDesc as string }),
          ...(body.price !== undefined && { price: body.price as number }),
          ...(body.salePrice !== undefined && { salePrice: body.salePrice as number }),
          ...(body.sku !== undefined && { sku: body.sku as string }),
          ...(body.inStock !== undefined && { inStock: body.inStock as boolean }),
          ...(body.featured !== undefined && { featured: body.featured as boolean }),
          ...(body.newArrival !== undefined && { newArrival: body.newArrival as boolean }),
          ...(body.images !== undefined && { images: body.images as object[] }),
          ...(body.categoryId && { categoryId: body.categoryId as string }),
          ...(body.materials !== undefined && { materials: body.materials as string[] }),
          ...(body.colors !== undefined && { colors: body.colors as string[] }),
          ...(body.finishes !== undefined && { finishes: body.finishes as string[] }),
          ...(body.tags !== undefined && { tags: body.tags as string[] }),
          ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle as string }),
          ...(body.metaDesc !== undefined && { metaDesc: body.metaDesc as string }),
          ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder as number }),
          ...(body.publishedAt !== undefined && { publishedAt: body.publishedAt ? new Date(body.publishedAt as string) : null }),
        },
        include: { category: true },
      })

      await cache.delPattern('products:*')

      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/products/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Products'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.product.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Product')

      await fastify.prisma.product.delete({ where: { id } })
      await cache.delPattern('products:*')

      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PATCH /api/products/:id/toggle
  fastify.patch('/:id/toggle', {
    preHandler: authenticate,
    schema: {
      tags: ['Products'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: {
        type: 'object',
        required: ['field'],
        properties: {
          field: { type: 'string', enum: ['featured', 'inStock', 'newArrival'] },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const { field } = request.body as { field: 'featured' | 'inStock' | 'newArrival' }

      const existing = await fastify.prisma.product.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Product')

      const updated = await fastify.prisma.product.update({
        where: { id },
        data: { [field]: !existing[field] },
      })

      await cache.delPattern('products:*')

      return success(reply, { id: updated.id, [field]: updated[field] })
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default productsRoutes
