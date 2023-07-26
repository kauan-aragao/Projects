import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(roleToVerify: 'Org' | 'User') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
