import { FastifyPluginAsync } from 'fastify'
import { authenticate } from '../middleware/authenticate'
import { success, notFound, serverError } from '../utils/response'
import { parsePagination, buildMeta } from '../utils/pagination'
import { sendNewInquiryAdmin, sendInquiryConfirmation } from '../services/email.service'
import type { Prisma } from '@prisma/client'

const inquiriesRoutes: FastifyPluginAsync = async (fastify) => {

  // POST /api/inquiries — PUBLIC
  fastify.post('/', {
    config: { rateLimit: { max: 5, timeWindow: '5 minutes' } },
    schema: {
      tags: ['Inquiries'],
      body: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 100 },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string', maxLength: 20 },
          subject: { type: 'string', maxLength: 200 },
          message: { type: 'string', minLength: 10, maxLength: 2000 },
          productId: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = request.body as {
        name: string; email: string; phone?: string; subject?: string; message: string; productId?: string
      }

      const inquiry = await fastify.prisma.inquiry.create({
        data: {
          name: body.name,
          email: body.email.toLowerCase(),
          phone: body.phone,
          subject: body.subject,
          message: body.message,
          productId: body.productId,
        },
      })

      // Fetch product name if provided
      let productName: string | undefined
      let productSlug: string | undefined
      if (body.productId) {
        const product = await fastify.prisma.product.findUnique({ where: { id: body.productId }, select: { name: true, slug: true } })
        productName = product?.name
        productSlug = product?.slug
      }

      // Send emails (non-blocking)
      Promise.all([
        sendNewInquiryAdmin({ inquiryId: inquiry.id, ...body, productName, productSlug }),
        sendInquiryConfirmation({ name: body.name, email: body.email, message: body.message }),
      ]).catch((emailErr) => fastify.log.error(emailErr, 'Email send failed'))

      return success(reply, { id: inquiry.id }, 201)
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/inquiries — auth
  fastify.get('/', {
    preHandler: authenticate,
    schema: {
      tags: ['Inquiries'],
      querystring: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM'] },
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 20 },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const query = request.query as { status?: string; page?: number; limit?: number }
      const { page, limit, skip } = parsePagination(query, 20)

      const where: Prisma.InquiryWhereInput = {}
      if (query.status) where.status = query.status as Prisma.EnumInquiryStatusFilter['equals']

      const [items, total] = await Promise.all([
        fastify.prisma.inquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
        fastify.prisma.inquiry.count({ where }),
      ])

      return success(reply, items, 200, buildMeta(total, page, limit))
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // PUT /api/inquiries/:id — auth
  fastify.put('/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Inquiries'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM'] },
          notes: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as { status?: string; notes?: string }
      const existing = await fastify.prisma.inquiry.findUnique({ where: { id } })
      if (!existing) return notFound(reply, 'Inquiry')

      const updated = await fastify.prisma.inquiry.update({
        where: { id },
        data: {
          ...(body.status && { status: body.status as Prisma.EnumInquiryStatusFilter['equals'] }),
          ...(body.notes !== undefined && { notes: body.notes }),
        },
      })
      return success(reply, updated)
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default inquiriesRoutes
