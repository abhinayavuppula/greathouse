import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, notFound, serverError } from '../utils/response'
import { slugify } from '../utils/slugify'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'

const categoriesRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  function buildTree(cats: Array<{ id: string; parentId: string | null; [key: string]: unknown }>) {
    const map: Record<string, typeof cats[0] & { children: typeof cats }> = {}
    const roots: Array<typeof map[string]> = []

    cats.forEach((c) => { map[c.id] = { ...c, children: [] } })
    cats.forEach((c) => {
      if (c.parentId && map[c.parentId]) {
        map[c.parentId].children.push(map[c.id])
      } else {
        roots.push(map[c.id])
      }
    })
    return roots
  }

  // GET /api/categories (tree)
  fastify.get('/', { schema: { tags: ['Categories'] } }, async (request, reply) => {
    try {
      const cached = await cache.get(CacheKeys.categories)
      if (cached) return success(reply, cached)

      const categories = await fastify.prisma.category.findMany({
        where: { visible: true },
        include: { _count: { select: { products: true } } },
        orderBy: { sortOrder: 'asc' },
      })

      const tree = buildTree(categories as Example[])
      await cache.set(CacheKeys.categories, tree, TTL.categories)

      return success(reply, tree)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/categories/:slug
  fastify.get('/:slug', {
    schema: { tags: ['Categories'], params: { type: 'object', properties: { slug: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string }
      const category = await fastify.prisma.category.findUnique({
        where: { slug },
        include: { children: { orderBy: { sortOrder: 'asc' } }, parent: true },
      })
      if (!category) return notFound(reply, 'Category')
      return success(reply, category)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/categories
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Categories'],
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          slug: { type: 'string' },
          description: { type: 'string' },
          image: { type: 'string' },
          parentId: { type: 'string' },
          sortOrder: { type: 'integer' },
          visible: { type: 'boolean' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const slug = (body.slug as string) || slugify(body.name as string)

      const category = await fastify.prisma.category.create({
        data: {
          name: body.name as string,
          slug,
          description: body.description as string | undefined,
          image: body.image as string | undefined,
          parentId: body.parentId as string | undefined,
          sortOrder: (body.sortOrder as number) ?? 0,
          visible: (body.visible as boolean) ?? true,
        },
      })

      await cache.del(CacheKeys.categories)
      return success(reply, category, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/categories/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Categories'], params: { type: 'object', properties: { id: { type: 'string' } } }, body: { type: 'object' } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>
      const existing = await fastify.prisma.category.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Category')

      const updated = await fastify.prisma.category.update({
        where: { id },
        data: {
          ...(body.name ? { name: body.name as string } : {}),
          ...(body.slug ? { slug: body.slug as string } : {}),
          ...(body.description !== undefined ? { description: body.description as string } : {}),
          ...(body.image !== undefined ? { image: body.image as string } : {}),
          ...(body.parentId !== undefined ? { parentId: body.parentId as string | null } : {}),
          ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder as number } : {}),
          ...(body.visible !== undefined ? { visible: body.visible as boolean } : {}),
        },
      })
      await cache.del(CacheKeys.categories)
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/categories/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Categories'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.category.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Category')
      await fastify.prisma.category.delete({ where: { id } })
      await cache.del(CacheKeys.categories)
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

// Temp type fix
type Example = { id: string; parentId: string | null; [key: string]: unknown }

export default categoriesRoutes
