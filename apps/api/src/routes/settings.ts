import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, serverError } from '../utils/response'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'

const PRIVATE_KEYS = ['stripe_secret', 'jwt_secret', 'cloudinary_secret']

const settingsRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/settings — PUBLIC (non-sensitive only)
  fastify.get('/', { schema: { tags: ['Settings'] } }, async (request, reply) => {
    try {
      const cached = await cache.get(CacheKeys.settings)
      if (cached) return success(reply, cached)

      const settings = await fastify.prisma.siteSetting.findMany({
        where: { key: { notIn: PRIVATE_KEYS } },
      })
      const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))
      await cache.set(CacheKeys.settings, map, TTL.settings)
      return success(reply, map)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/settings/all — auth
  fastify.get('/all', {
    preHandler: authenticate,
    schema: { tags: ['Settings'] },
  }, async (request, reply) => {
    try {
      const settings = await fastify.prisma.siteSetting.findMany({ orderBy: { group: 'asc' } })
      return success(reply, settings)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/settings — auth
  fastify.put('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Settings'],
      body: {
        type: 'array',
        items: {
          type: 'object',
          required: ['key', 'value'],
          properties: { key: { type: 'string' }, value: { type: 'string' } },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const updates = request.body as Array<{ key: string; value: string; label?: string; group?: string }>

      await fastify.prisma.$transaction(
        updates.map(({ key, value, label, group }) =>
          fastify.prisma.siteSetting.upsert({
            where: { key },
            update: { value, ...(label && { label }), ...(group && { group }) },
            create: { key, value, label, group },
          })
        )
      )

      await cache.del(CacheKeys.settings)
      return success(reply, { updated: updates.length })
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default settingsRoutes
