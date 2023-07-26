import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { MakeCreatePetService } from '@/services/factories/make-create-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    about: z.string().nullish(),
    age: z.enum(['Puppy', 'Young', 'Adult']),
    size: z.enum(['Small', 'Medium', 'Big']),
    sex: z.enum(['Female', 'Male']),
  })

  const createParamsSchema = z.object({
    orgId: z.string(),
  })

  const { about, age, city, sex, size, name } = createBodySchema.parse(
    request.body,
  )

  const { orgId } = createParamsSchema.parse(request.params)

  try {
    const createService = MakeCreatePetService()

    await createService.execute({
      age,
      city,
      orgId,
      sex,
      size,
      about,
      name,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
