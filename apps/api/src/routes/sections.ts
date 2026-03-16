import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, notFound, serverError } from '../utils/response'
import { createCacheService, CacheKeys } from '../services/cache.service'

const sectionsRoutes: FastifyPluginAsync = async (fastify) => {
  const cache = createCacheService(fastify)

  async function bustPageCache(sectionId?: string, pageId?: string) {
    let targetPageId = pageId
    if (sectionId && !pageId) {
      const sec = await fastify.prisma.section.findUnique({ where: { id: sectionId }, select: { pageId: true } })
      targetPageId = sec?.pageId
    }
    if (targetPageId) {
      const page = await fastify.prisma.page.findUnique({ where: { id: targetPageId }, select: { slug: true } })
      if (page) await cache.del(CacheKeys.page(page.slug))
    }
  }

  // GET /api/sections?pageId=
  fastify.get('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Sections'],
      querystring: { type: 'object', properties: { pageId: { type: 'string' } } },
    },
  }, async (request, reply) => {
    try {
      const { pageId } = request.query as { pageId?: string }
      const sections = await fastify.prisma.section.findMany({
        where: pageId ? { pageId } : undefined,
        orderBy: { sortOrder: 'asc' },
      })
      return success(reply, sections)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/sections
  fastify.post('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Sections'],
      body: {
        type: 'object',
        required: ['pageId', 'type', 'content'],
        properties: {
          pageId: { type: 'string' },
          type: { type: 'string' },
          label: { type: 'string' },
          sortOrder: { type: 'integer' },
          visible: { type: 'boolean' },
          content: { type: 'object' },
          styles: { type: 'object' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>
      const section = await fastify.prisma.section.create({
        data: {
          pageId: body.pageId as string,
          type: body.type as Example,
          label: body.label as string | undefined,
          sortOrder: (body.sortOrder as number) ?? 0,
          visible: (body.visible as boolean) ?? true,
          content: body.content as object,
          styles: (body.styles as object) ?? {},
        },
      })
      await bustPageCache(undefined, body.pageId as string)
      return success(reply, section, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/sections/:id
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Sections'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { type: 'object' },
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as Record<string, unknown>
      const existing = await fastify.prisma.section.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Section')

      const updated = await fastify.prisma.section.update({
        where: { id },
        data: {
          ...(body.content !== undefined && { content: body.content as object }),
          ...(body.styles !== undefined && { styles: body.styles as object }),
          ...(body.visible !== undefined && { visible: body.visible as boolean }),
          ...(body.label !== undefined && { label: body.label as string }),
          ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder as number }),
        },
      })

      await bustPageCache(id)
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/sections/reorder
  fastify.put('/reorder', {
    preHandler: authenticate,
    schema: {
      tags: ['Sections'],
      body: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, sortOrder: { type: 'integer' } } } },
    },
  }, async (request, reply) => {
    try {
      const updates = request.body as Array<{ id: string; sortOrder: number }>

      await fastify.prisma.$transaction(
        updates.map(({ id, sortOrder }) =>
          fastify.prisma.section.update({ where: { id }, data: { sortOrder } })
        )
      )

      if (updates[0]) await bustPageCache(updates[0].id)
      return success(reply, { updated: updates.length })
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // DELETE /api/sections/:id
  fastify.delete('/:id', {
    preHandler: authenticate,
    schema: { tags: ['Sections'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.section.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Section')
      await fastify.prisma.section.delete({ where: { id } })
      await bustPageCache(undefined, existing.pageId)
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/sections/:id/duplicate
  fastify.post('/:id/duplicate', {
    preHandler: authenticate,
    schema: { tags: ['Sections'], params: { type: 'object', properties: { id: { type: 'string' } } } },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const existing = await fastify.prisma.section.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Section')

      const clone = await fastify.prisma.section.create({
        data: {
          pageId: existing.pageId,
          type: existing.type,
          label: existing.label ? `${existing.label} (Copy)` : null,
          sortOrder: existing.sortOrder + 1,
          visible: false,
          content: existing.content as object,
          styles: existing.styles as object,
        },
      })

      await bustPageCache(undefined, existing.pageId)
      return success(reply, clone, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

type Example = import('@prisma/client').SectionType

export default sectionsRoutes
