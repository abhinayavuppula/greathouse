import 'dotenv/config'
import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import fp from 'fastify-plugin'

// Plugins
import prismaPlugin from './plugins/prisma'
import redisPlugin from './plugins/redis'
import authPlugin from './plugins/auth'
import corsPlugin from './plugins/cors'
import multipartPlugin from './plugins/multipart'
import swaggerPlugin from './plugins/swagger'
import cloudinaryPlugin from './plugins/cloudinary'

// Routes
import authRoutes from './routes/auth'
import productsRoutes from './routes/products'
import categoriesRoutes from './routes/categories'
import collectionsRoutes from './routes/collections'
import pagesRoutes from './routes/pages'
import sectionsRoutes from './routes/sections'
import themeRoutes from './routes/theme'
import mediaRoutes from './routes/media'
import testimonialsRoutes from './routes/testimonials'
import teamRoutes from './routes/team'
import inquiriesRoutes from './routes/inquiries'
import newsletterRoutes from './routes/newsletter'
import settingsRoutes from './routes/settings'

const PORT = parseInt(process.env.PORT || '3001', 10)
const HOST = '0.0.0.0'

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
    trustProxy: true,
  })

  // Security headers
  await fastify.register(helmet, {
    contentSecurityPolicy: false, // Swagger UI needs this off
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })

  // Plugins
  await fastify.register(corsPlugin)
  await fastify.register(swaggerPlugin)
  await fastify.register(prismaPlugin)
  await fastify.register(redisPlugin)
  await fastify.register(authPlugin)
  await fastify.register(multipartPlugin)
  await fastify.register(cloudinaryPlugin)

  // Rate limiting (global)
  await fastify.register(import('@fastify/rate-limit'), {
    global: true,
    max: 60,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
    errorResponseBuilder: (_, ctx) => ({
      success: false,
      error: `Rate limit exceeded. Retry in ${Math.ceil(ctx.ttl / 1000)}s`,
    }),
  })

  // Health check
  fastify.get('/health', { schema: { tags: ['Health'] } }, async (_, reply) => {
    return reply.send({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // API Routes
  await fastify.register(authRoutes, { prefix: '/api/auth' })
  await fastify.register(productsRoutes, { prefix: '/api/products' })
  await fastify.register(categoriesRoutes, { prefix: '/api/categories' })
  await fastify.register(collectionsRoutes, { prefix: '/api/collections' })
  await fastify.register(pagesRoutes, { prefix: '/api/pages' })
  await fastify.register(sectionsRoutes, { prefix: '/api/sections' })
  await fastify.register(themeRoutes, { prefix: '/api/theme' })
  await fastify.register(mediaRoutes, { prefix: '/api/media' })
  await fastify.register(testimonialsRoutes, { prefix: '/api/testimonials' })
  await fastify.register(teamRoutes, { prefix: '/api/team' })
  await fastify.register(inquiriesRoutes, { prefix: '/api/inquiries' })
  await fastify.register(newsletterRoutes, { prefix: '/api/newsletter' })
  await fastify.register(settingsRoutes, { prefix: '/api/settings' })

  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error({ err: error, url: request.url }, 'Unhandled error')
    if (error.validation) {
      return reply.code(400).send({ success: false, error: error.message })
    }
    return reply.code(error.statusCode || 500).send({
      success: false,
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    })
  })

  return fastify
}

async function start() {
  const fastify = await buildServer()
  try {
    await fastify.listen({ port: PORT, host: HOST })
    fastify.log.info(`🚀 Great Houses API running at http://${HOST}:${PORT}`)
    fastify.log.info(`📖 Swagger UI: http://localhost:${PORT}/api/docs`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
