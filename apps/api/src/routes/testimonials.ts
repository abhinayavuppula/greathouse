import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, notFound, serverError } from '../utils/response'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'

const testimonialsRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/testimonials — PUBLIC (featured)
  fastify.get('/', { schema: { tags: ['Testimonials'] } }, async (request, reply) => {
    try {
      const cached = await cache.get(CacheKeys.testimonials)
      if (cached) return success(reply, cached)

      const items = await fastify.prisma.testimonial.findMany({
        where: { featured: true, visible: true },
        orderBy: { sortOrder: 'asc' },
      })
      await cache.set(CacheKeys.testimonials, items, TTL.testimonials)
      return success(reply, items)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/testimonials/all — auth
  fastify.get('/all', { preHandler: authenticate, schema: { tags: ['Testimonials'] } }, async (request, reply) => {
    try {
      const items = await fastify.prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } })
      return success(reply, items)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/testimonials
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Testimonials'],
      body: {
        type: 'object',
        required: ['name', 'content'],
        properties: {
          name: { type: 'string' },
          title: { type: 'string' },
          company: { type: 'string' },
          avatar: { type: 'string' },
          content: { type: 'string' },
          rating: { type: 'integer', minimum: 1, maximum: 5 },
          featured: { type: 'boolean' },
          sortOrder: { type: 'integer' },
          visible: { type: 'boolean' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const item = await fastify.prisma.testimonial.create({
        data: {
          name: body.name as string,
          content: body.content as string,
          title: body.title as string | undefined,
          company: body.company as string | undefined,
          avatar: body.avatar as string | undefined,
          rating: (body.rating as number) ?? 5,
          featured: (body.featured as boolean) ?? false,
          sortOrder: (body.sortOrder as number) ?? 0,
          visible: (body.visible as boolean) ?? true,
        },
      })
      await cache.del(CacheKeys.testimonials)
      return success(reply, item, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/testimonials/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Testimonials'], params: { type: 'object', properties: { id: { type: 'string' } } }, body: { type: 'object' } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>
      const existing = await fastify.prisma.testimonial.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Testimonial')

      const updated = await fastify.prisma.testimonial.update({ where: { id }, data: body as Parameters<typeof fastify.prisma.testimonial.update>[0]['data'] })
      await cache.del(CacheKeys.testimonials)
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/testimonials/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Testimonials'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.testimonial.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Testimonial')
      await fastify.prisma.testimonial.delete({ where: { id } })
      await cache.del(CacheKeys.testimonials)
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default testimonialsRoutes
