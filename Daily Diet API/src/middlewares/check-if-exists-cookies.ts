import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkCookieSession(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId
  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized access',
      message: 'You need to login first',
    })
  }
}
