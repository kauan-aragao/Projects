import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { MakeGetPetDetailsService } from '@/services/factories/make-get-pet-details'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const getDetailsParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getDetailsParamsSchema.parse(request.params)

  try {
    const getDetailsService = MakeGetPetDetailsService()

    const { pet } = await getDetailsService.execute({
      id,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
