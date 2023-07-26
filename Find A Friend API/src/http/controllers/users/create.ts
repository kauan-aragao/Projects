import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { MakeCreateUserService } from '@/services/factories/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = createBodySchema.parse(request.body)

  try {
    const createService = MakeCreateUserService()

    await createService.execute({ email, name, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
