import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsService } from '../get-pet-details'

export function MakeGetPetDetailsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new GetPetDetailsService(petsRepository)

  return service
}
