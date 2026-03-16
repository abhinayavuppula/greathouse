import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, error, notFound, serverError } from '../utils/response'
import { parsePagination, buildMeta } from '../utils/pagination'
import { sendNewsletterWelcome, sendUnsubscribeConfirmation } from '../services/email.service'

const newsletterRoutes: FastifyPluginAsync = async (fastify) => {

  // POST /api/newsletter/subscribe — PUBLIC
  fastify.post('/subscribe', {
    config: { rateLimit: { max: 3, timeWindow: '5 minutes' } },
    schema: {
      tags: ['Newsletter'],
      body: {
        type: 'object',
        required: ['email'],
        properties: { email: { type: 'string', format: 'email' } },
      },
    },
  }, async (request, reply) => {
    try {
      const { email } = request.body as { email: string }

      const existing = await fastify.prisma.newsletterSubscriber.findUnique({
        where: { email: email.toLowerCase() },
      })

      if (existing?.active) {
        return success(reply, { message: 'Already subscribed' })
      }

      let subscriber
      if (existing) {
        subscriber = await fastify.prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { active: true },
        })
      } else {
        subscriber = await fastify.prisma.newsletterSubscriber.create({
          data: { email: email.toLowerCase() },
        })
      }

      // Send welcome email non-blocking
      sendNewsletterWelcome({ email: subscriber.email, unsubscribeToken: subscriber.token })
        .catch((err) => fastify.log.error(err, 'Welcome email failed'))

      return success(reply, { message: 'Subscribed successfully' }, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/newsletter/unsubscribe — PUBLIC (click from email)
  fastify.get('/unsubscribe', {
    schema: {
      tags: ['Newsletter'],
      querystring: { type: 'object', required: ['token'], properties: { token: { type: 'string' } } },
    },
  }, async (request, reply) => {
    try {
      const { token } = request.query as { token: string }
      const subscriber = await fastify.prisma.newsletterSubscriber.findUnique({ where: { token } })

      if (!subscriber) return notFound(reply, 'Subscriber')

      await fastify.prisma.newsletterSubscriber.update({
        where: { token },
        data: { active: false },
      })

      sendUnsubscribeConfirmation(subscriber.email)
        .catch((err) => fastify.log.error(err, 'Unsubscribe email failed'))

      return success(reply, { message: 'Unsubscribed successfully' })
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/newsletter/subscribers — auth
  fastify.get('/subscribers', {
    preHandler: authenticate,
    schema: {
      tags: ['Newsletter'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 50 },
          active: { type: 'boolean' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const query = request.query as { page?: number; limit?: number; active?: boolean }
      const { page, limit, skip } = parsePagination(query, 50)

      const where = query.active !== undefined ? { active: Boolean(query.active) } : {}

      const [items, total] = await Promise.all([
        fastify.prisma.newsletterSubscriber.findMany({ where, orderBy: { subscribedAt: 'desc' }, skip, take: limit }),
        fastify.prisma.newsletterSubscriber.count({ where }),
      ])

      return success(reply, items, 200, buildMeta(total, page, limit))
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default newsletterRoutes
