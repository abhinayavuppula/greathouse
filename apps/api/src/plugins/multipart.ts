import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import fastifyMultipart from '@fastify/multipart'

const multipartPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
      files: 20,
      fieldSize: 1024 * 1024,
    },
  })
})

export default multipartPlugin
