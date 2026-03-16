import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import fastifyCors from '@fastify/cors'

const corsPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.CMS_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ].filter(Boolean) as string[]

  await fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      if (!origin) {
        cb(null, true)
        return
      }
      if (allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
        cb(null, true)
        return
      }
      fastify.log.warn({ origin }, 'CORS blocked origin')
      cb(new Error(`Origin ${origin} not allowed by CORS`), false)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Preview-Secret'],
    maxAge: 86400,
  })
})

export default corsPlugin
