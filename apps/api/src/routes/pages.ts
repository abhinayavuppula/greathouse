import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { requireAdmin } from '../middleware/requireAdmin'
import { success, notFound, serverError } from '../utils/response'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'

const pagesRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/pages (auth — CMS only)
  fastify.get('/', {
    preHandler: authenticate,
    schema: { tags: ['Pages'] },
  }, async (request, reply) => {
    try {
      const pages = await fastify.prisma.page.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { sections: true } } },
      })
      return success(reply, pages)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/pages/:slug — PUBLIC, cached
  fastify.get('/:slug', {
    schema: {
      tags: ['Pages'],
      params: { type: 'object', properties: { slug: { type: 'string' } } },
    },
  }, async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string }
      const cacheKey = CacheKeys.page(slug)

      const cached = await cache.get(cacheKey)
      if (cached) return success(reply, cached)

      const [page, theme] = await Promise.all([
        fastify.prisma.page.findUnique({
          where: { slug, published: true },
          include: {
            sections: {
              where: { visible: true },
              orderBy: { sortOrder: 'asc' },
            },
          },
        }),
        fastify.prisma.theme.findFirst({ where: { isActive: true } }),
      ])

      if (!page) return notFound(reply, 'Page')

      const result = { ...page, theme }
      await cache.set(cacheKey, result, TTL.page)
      return success(reply, result)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/pages
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Pages'],
      body: {
        type: 'object',
        required: ['title', 'slug'],
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          metaTitle: { type: 'string' },
          metaDesc: { type: 'string' },
          ogImage: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { title, slug, metaTitle, metaDesc, ogImage } = request.body as Record<string, string>
      const page = await fastify.prisma.page.create({
        data: { title, slug, metaTitle, metaDesc, ogImage },
      })
      return success(reply, page, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/pages/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Pages'], params: { type: 'object', properties: { id: { type: 'string' } } }, body: { type: 'object' } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>

      const existing = await fastify.prisma.page.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Page')

      const updated = await fastify.prisma.page.update({
        where: { id },
        data: {
          ...(body.title !== undefined && { title: body.title as string }),
          ...(body.slug !== undefined && { slug: body.slug as string }),
          ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle as string }),
          ...(body.metaDesc !== undefined && { metaDesc: body.metaDesc as string }),
          ...(body.ogImage !== undefined && { ogImage: body.ogImage as string }),
        },
      })

      await cache.del(CacheKeys.page(updated.slug), CacheKeys.page(existing.slug))
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/pages/:id — SUPER_ADMIN only
  fastify.delete('/:id', {
    preHandler: requireAdmin,
    schema: { tags: ['Pages'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.page.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Page')
      await fastify.prisma.page.delete({ where: { id } })
      await cache.del(CacheKeys.page(existing.slug))
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PATCH /api/pages/:id/publish
  fastify.patch('/:id/publish', {
    preHandler: authenticate,
    schema: { tags: ['Pages'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.page.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Page')

      const updated = await fastify.prisma.page.update({
        where: { id },
        data: {
          published: !existing.published,
          publishedAt: !existing.published ? new Date() : null,
        },
      })

      await cache.del(CacheKeys.page(updated.slug))
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default pagesRoutes
