import { FastifyRequest, FastifyReply } from 'fastify'
import { authenticate } from './authenticate'
import { forbidden } from '../utils/response'

export async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  await authenticate(request, reply)
  if (reply.sent) return

  const user = (request as FastifyRequest & { currentUser: { role: string } | null }).currentUser
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    return forbidden(reply, 'Admin access required')
  }
}

export async function requireSuperAdmin(request: FastifyRequest, reply: FastifyReply) {
  await authenticate(request, reply)
  if (reply.sent) return

  const user = (request as FastifyRequest & { currentUser: { role: string } | null }).currentUser
  if (!user || user.role !== 'SUPER_ADMIN') {
    return forbidden(reply, 'Super admin access required')
  }
}
