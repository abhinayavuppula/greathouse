import { FastifyRequest, FastifyReply } from 'fastify'
import { unauthorized } from '../utils/response'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    const payload = request.user as { userId: string; email: string; role: string }

    const user = await request.server.prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
    })

    if (!user) {
      return unauthorized(reply, 'User not found')
    }

    ;(request as FastifyRequest & { currentUser: typeof user }).currentUser = user
  } catch (err) {
    return unauthorized(reply, 'Invalid or expired token')
  }
}
