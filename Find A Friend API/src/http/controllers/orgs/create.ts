import { OrgAlreadyExistsError } from '@/services/errors/orgs-already-exists-error'
import { MakeCreateOrgService } from '@/services/factories/make-create-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
  })

  const { email, name, password, address, city, phone } =
    createBodySchema.parse(request.body)

  try {
    const createService = MakeCreateOrgService()

    await createService.execute({ email, name, password, address, city, phone })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
