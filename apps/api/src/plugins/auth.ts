import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { User } from '@greathouses/shared-types'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; email: string; role: string }
    user: { userId: string; email: string; role: string }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: User | null
  }
}

const authPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifyCookie, {
    secret: process.env.JWT_SECRET as string,
    hook: 'onRequest',
    parseOptions: {},
  })

  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    },
    cookie: {
      cookieName: 'accessToken',
      signed: false,
    },
  })

  fastify.decorateRequest('currentUser', null)
})

export default authPlugin
