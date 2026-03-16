import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const swaggerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Great Houses India API',
        description: 'Backend API for Great Houses India — luxury Indian furniture platform',
        version: '1.0.0',
        contact: {
          name: 'GreatHouses Dev',
          email: 'dev@greathouses.in',
        },
      },
      servers: [
        { url: 'http://localhost:3001', description: 'Local' },
        { url: 'https://greathouses-api.up.railway.app', description: 'Production' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  })

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  })
})

export default swaggerPlugin
