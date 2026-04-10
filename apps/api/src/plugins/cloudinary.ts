import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { v2 as cloudinary } from 'cloudinary'

const cloudinaryPlugin: FastifyPluginAsync = fp(async (fastify) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })

  fastify.log.info('Cloudinary configured')
})

export default cloudinaryPlugin
