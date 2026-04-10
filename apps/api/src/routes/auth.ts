import { FastifyPluginAsync } from 'fastify'
import bcrypt from 'bcryptjs'
import { authenticate } from '../middleware/authenticate'
import { success, error, unauthorized, serverError } from '../utils/response'
import crypto from 'crypto'

const authRoutes: FastifyPluginAsync = async (fastify) => {

  // POST /api/auth/login
  fastify.post('/login', {
    config: {
      rateLimit: { max: 10, timeWindow: '1 minute' },
    },
    schema: {
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { email, password } = request.body as { email: string; password: string }

      const user = await fastify.prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      })

      if (!user) {
        return unauthorized(reply, 'Invalid email or password')
      }

      const isValid = await bcrypt.compare(password, user.passwordHash)
      if (!isValid) {
        return unauthorized(reply, 'Invalid email or password')
      }

      const accessToken = fastify.jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
      )

      const refreshTokenValue = crypto.randomBytes(64).toString('hex')
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

      await fastify.prisma.refreshToken.create({
        data: {
          token: refreshTokenValue,
          userId: user.id,
          expiresAt,
        },
      })

      reply.setCookie('refreshToken', refreshTokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth',
        expires: expiresAt,
      })

      const { passwordHash: _ph, ...safeUser } = user

      return success(reply, { accessToken, user: safeUser })
    } catch (err) {
      fastify.log.error(err)
      return serverError(reply, err)
    }
  })

  // POST /api/auth/refresh
  fastify.post('/refresh', {
    schema: { tags: ['Auth'] },
  }, async (request, reply) => {
    try {
      const refreshTokenValue = request.cookies?.refreshToken

      if (!refreshTokenValue) {
        return unauthorized(reply, 'No refresh token provided')
      }

      const storedToken = await fastify.prisma.refreshToken.findUnique({
        where: { token: refreshTokenValue },
        include: { user: true },
      })

      if (!storedToken || storedToken.expiresAt < new Date()) {
        reply.clearCookie('refreshToken', { path: '/api/auth' })
        return unauthorized(reply, 'Refresh token invalid or expired')
      }

      // Rotate: delete old, create new
      await fastify.prisma.refreshToken.delete({ where: { id: storedToken.id } })

      const newRefreshToken = crypto.randomBytes(64).toString('hex')
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      await fastify.prisma.refreshToken.create({
        data: { token: newRefreshToken, userId: storedToken.userId, expiresAt },
      })

      const accessToken = fastify.jwt.sign(
        { userId: storedToken.user.id, email: storedToken.user.email, role: storedToken.user.role },
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
      )

      reply.setCookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth',
        expires: expiresAt,
      })

      return success(reply, { accessToken })
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // POST /api/auth/logout
  fastify.post('/logout', {
    schema: { tags: ['Auth'] },
  }, async (request, reply) => {
    try {
      const refreshTokenValue = request.cookies?.refreshToken
      if (refreshTokenValue) {
        await fastify.prisma.refreshToken.deleteMany({
          where: { token: refreshTokenValue },
        })
      }
      reply.clearCookie('refreshToken', { path: '/api/auth' })
      return reply.code(204).send()
    } catch (err) {
      return serverError(reply, err)
    }
  })

  // GET /api/auth/me
  fastify.get('/me', {
    preHandler: authenticate,
    schema: { tags: ['Auth'] },
  }, async (request, reply) => {
    const user = (request as typeof request & { currentUser: object }).currentUser
    return success(reply, user)
  })

  // PUT /api/auth/password
  fastify.put('/password', {
    preHandler: authenticate,
    schema: {
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['currentPassword', 'newPassword'],
        properties: {
          currentPassword: { type: 'string', minLength: 6 },
          newPassword: { type: 'string', minLength: 8 },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { currentPassword, newPassword } = request.body as { currentPassword: string; newPassword: string }
      const currentUser = (request as typeof request & { currentUser: { id: string } }).currentUser

      const user = await fastify.prisma.user.findUnique({ where: { id: currentUser!.id } })
      if (!user) return unauthorized(reply)

      const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!isValid) return error(reply, 'Current password is incorrect', 400)

      const newHash = await bcrypt.hash(newPassword, 12)
      await fastify.prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      })

      // Revoke all refresh tokens
      await fastify.prisma.refreshToken.deleteMany({ where: { userId: user.id } })
      reply.clearCookie('refreshToken', { path: '/api/auth' })

      return success(reply, { message: 'Password changed successfully' })
    } catch (err) {
      return serverError(reply, err)
    }
  })
}

export default authRoutes
