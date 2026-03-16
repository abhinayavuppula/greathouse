import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { requireAdmin } from '../middleware/requireAdmin'
import { success, serverError } from '../utils/response'
import { createCacheService, CacheKeys, TTL } from '../services/cache.service'

const themeRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  // GET /api/theme — PUBLIC, 1hr cache
  fastify.get('/', { schema: { tags: ['Theme'] } }, async (request, reply) => {
    try {
      const cached = await cache.get(CacheKeys.theme)
      if (cached) return success(reply, cached)

      const theme = await fastify.prisma.theme.findFirst({ where: { isActive: true } })
      await cache.set(CacheKeys.theme, theme, TTL.theme)
      return success(reply, theme)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/theme — auth, bust cache
  fastify.put('/', {
    preHandler: authenticate,
    schema: { tags: ['Theme'], body: { type: 'object' } },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const current = await fastify.prisma.theme.findFirst({ where: { isActive: true } })

      const theme = current
        ? await fastify.prisma.theme.update({ where: { id: current.id }, data: body })
        : await fastify.prisma.theme.create({ data: { ...(body as Parameters<typeof fastify.prisma.theme.create>[0]['data']) } })

      await cache.del(CacheKeys.theme)
      return success(reply, theme)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/theme/reset — SUPER_ADMIN only
  fastify.post('/reset', {
    preHandler: requireAdmin,
    schema: { tags: ['Theme'] },
  }, async (request, reply) => {
    try {
      const current = await fastify.prisma.theme.findFirst({ where: { isActive: true } })
      if (!current) return success(reply, null)

      const defaults = {
        colorPrimary: '#1a1a1a',
        colorSecondary: '#c9a96e',
        colorAccent: '#f5f0e8',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorMuted: '#6b7280',
        colorBorder: '#e5e7eb',
        colorError: '#ef4444',
        fontHeading: 'Playfair Display',
        fontBody: 'Jost',
        fontSizeBase: 16,
        lineHeight: '1.6',
        letterSpacing: '0em',
        borderRadius: '3px',
        buttonStyle: 'sharp',
        cardShadow: 'sm',
        navStyle: 'fixed',
        navBgColor: '#ffffff',
        navTextColor: '#1a1a1a',
        navHeight: 72,
        logoMaxHeight: 48,
        customCSS: null,
      }

      const reset = await fastify.prisma.theme.update({ where: { id: current.id }, data: defaults })
      await cache.del(CacheKeys.theme)
      return success(reply, reset)
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default themeRoutes
