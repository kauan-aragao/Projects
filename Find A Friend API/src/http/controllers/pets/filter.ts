import { MakeFilterPetsByCaracteristicsService } from '@/services/factories/make-filter-pets-by-caracteristics'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterQuerySchema = z.object({
    city: z.union([z.string(), z.undefined()]),
    age: z.union([z.enum(['Puppy', 'Young', 'Adult']), z.undefined()]),
    size: z.union([z.enum(['Small', 'Medium', 'Big']), z.undefined()]),
    sex: z.union([z.enum(['Female', 'Male']), z.undefined()]),
  })

  const { age, city, sex, size } = filterQuerySchema.parse(request.query)

  const filterByCaracteristicsService = MakeFilterPetsByCaracteristicsService()

  const { pets } = await filterByCaracteristicsService.execute({
    city,
    age,
    size,
    sex,
  })

  return reply.status(200).send({ pets })
}
