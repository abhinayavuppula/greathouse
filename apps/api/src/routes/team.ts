import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, notFound, serverError } from '../utils/response'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'

const teamRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/team — PUBLIC
  fastify.get('/', { schema: { tags: ['Team'] } }, async (request, reply) => {
    try {
      const cached = await cache.get(CacheKeys.team)
      if (cached) return success(reply, cached)

      const members = await fastify.prisma.teamMember.findMany({
        where: { visible: true },
        orderBy: { sortOrder: 'asc' },
      })
      await cache.set(CacheKeys.team, members, TTL.team)
      return success(reply, members)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/team
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Team'],
      body: {
        type: 'object',
        required: ['name', 'role'],
        properties: {
          name: { type: 'string' },
          role: { type: 'string' },
          bio: { type: 'string' },
          image: { type: 'string' },
          linkedin: { type: 'string' },
          instagram: { type: 'string' },
          sortOrder: { type: 'integer' },
          visible: { type: 'boolean' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const member = await fastify.prisma.teamMember.create({
        data: {
          name: body.name as string,
          role: body.role as string,
          bio: body.bio as string | undefined,
          image: body.image as string | undefined,
          linkedin: body.linkedin as string | undefined,
          instagram: body.instagram as string | undefined,
          sortOrder: (body.sortOrder as number) ?? 0,
          visible: (body.visible as boolean) ?? true,
        },
      })
      await cache.del(CacheKeys.team)
      return success(reply, member, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/team/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Team'], params: { type: 'object', properties: { id: { type: 'string' } } }, body: { type: 'object' } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>
      const existing = await fastify.prisma.teamMember.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Team member')
      const updated = await fastify.prisma.teamMember.update({ where: { id }, data: body as Parameters<typeof fastify.prisma.teamMember.update>[0]['data'] })
      await cache.del(CacheKeys.team)
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/team/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Team'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.teamMember.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Team member')
      await fastify.prisma.teamMember.delete({ where: { id } })
      await cache.del(CacheKeys.team)
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default teamRoutes
