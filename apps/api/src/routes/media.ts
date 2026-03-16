import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, notFound, serverError } from '../utils/response'
import { uploadFromBuffer, deleteAsset, applyTransforms } from '../services/cloudinary.service'
import { parsePagination, buildMeta } from '../utils/pagination'
import type { Prisma } from '@prisma/client'

const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
  'video/mp4', 'video/webm',
]

const mediaRoutes: FastifyPluginAsync = async (fastify) => {

  // GET /api/media
  fastify.get('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Media'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 24 },
          folder: { type: 'string' },
          search: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const query = request.query as Record<string, string | number>
      const { page, limit, skip } = parsePagination(query, 24)

      const where: Prisma.MediaAssetWhereInput = {}
      if (query.folder) where.folder = String(query.folder)
      if (query.search) {
        where.OR = [
          { filename: { contains: String(query.search), mode: 'insensitive' } },
          { alt: { contains: String(query.search), mode: 'insensitive' } },
        ]
      }

      const [assets, total] = await Promise.all([
        fastify.prisma.mediaAsset.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
        fastify.prisma.mediaAsset.count({ where }),
      ])

      return success(reply, assets.map((a) => ({ ...a, url: applyTransforms(a.url) })), 200, buildMeta(total, page, limit))
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/media/upload
  fastify.post('/upload', {
    preHandler: authenticate,
    schema: { tags: ['Media'] },
  }, async (request, reply) => {
    const parts = request.parts()
    const uploaded = []

    for await (const part of parts) {
      if (part.type !== 'file') continue

      if (!ALLOWED_MIME_TYPES.includes(part.mimetype)) {
        continue
      }

      const chunks: Buffer[] = []
      for await (const chunk of part.file) {
        chunks.push(chunk)
      }
      const buffer = Buffer.concat(chunks)

      if (buffer.length > 10 * 1024 * 1024) continue

      const resourceType = part.mimetype.startsWith('video/') ? 'video' : 'image'
      const result = await uploadFromBuffer(buffer, { resource_type: resourceType })

      const asset = await fastify.prisma.mediaAsset.create({
        data: {
          filename: part.filename || result.public_id,
          url: result.secure_url,
          publicId: result.public_id,
          mimeType: part.mimetype,
          size: buffer.length,
          width: result.width,
          height: result.height,
          folder: 'greathouses',
        },
      })
      uploaded.push({ ...asset, url: applyTransforms(asset.url) })
    }

    return success(reply, uploaded, 201)
  })

  // PUT /api/media/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Media'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: {
        type: 'object',
        properties: {
          alt: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          folder: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as { alt?: string; tags?: string[]; folder?: string }
      const existing = await fastify.prisma.mediaAsset.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Media asset')

      const updated = await fastify.prisma.mediaAsset.update({
        where: { id },
        data: {
          ...(body.alt !== undefined && { alt: body.alt }),
          ...(body.tags !== undefined && { tags: body.tags }),
          ...(body.folder !== undefined && { folder: body.folder }),
        },
      })
      return success(reply, { ...updated, url: applyTransforms(updated.url) })
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/media/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Media'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.mediaAsset.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Media asset')

      const resourceType = existing.mimeType.startsWith('video/') ? 'video' : 'image'
      await deleteAsset(existing.publicId, resourceType)
      await fastify.prisma.mediaAsset.delete({ where: { id } })
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default mediaRoutes
