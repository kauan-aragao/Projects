import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreatePetService } from '../create-pet'

export function MakeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const service = new CreatePetService(petsRepository, orgsRepository)

  return service
}
