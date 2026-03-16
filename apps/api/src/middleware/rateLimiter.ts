import { FastifyInstance } from 'fastify'

const PUBLIC_RATE_LIMIT = 60
const AUTH_RATE_LIMIT = 200
const LOGIN_RATE_LIMIT = 10

export async function registerRateLimits(fastify: FastifyInstance) {
  // Import dynamically to avoid circular imports
  const rateLimit = (await import('@fastify/rate-limit')).default

  await fastify.register(rateLimit, {
    global: true,
    max: PUBLIC_RATE_LIMIT,
    timeWindow: '1 minute',
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
    keyGenerator: (request) => {
      return request.ip
    },
    errorResponseBuilder: (_, context) => ({
      success: false,
      error: `Rate limit exceeded. Try again in ${Math.ceil(context.ttl / 1000)} seconds.`,
    }),
  })
}

export { PUBLIC_RATE_LIMIT, AUTH_RATE_LIMIT, LOGIN_RATE_LIMIT }
