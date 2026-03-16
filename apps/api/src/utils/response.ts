import { FastifyReply } from 'fastify'
import { PaginationMeta } from './pagination'

export function success<T>(reply: FastifyReply, data: T, statusCode = 200, meta?: PaginationMeta) {
  const body: Record<string, unknown> = { success: true, data }
  if (meta) body.meta = meta
  return reply.code(statusCode).send(body)
}

export function error(reply: FastifyReply, message: string, statusCode = 400) {
  return reply.code(statusCode).send({ success: false, error: message })
}

export function notFound(reply: FastifyReply, entity = 'Resource') {
  return error(reply, `${entity} not found`, 404)
}

export function unauthorized(reply: FastifyReply, message = 'Unauthorized') {
  return error(reply, message, 401)
}

export function forbidden(reply: FastifyReply, message = 'Forbidden') {
  return error(reply, message, 403)
}

export function serverError(reply: FastifyReply, err: unknown) {
  const message = err instanceof Error ? err.message : 'Internal server error'
  return error(reply, message, 500)
}
