import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsInCityService } from '../fetch-pets-list-in-a-city'

export function MakeFetchPetsInACityService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new FetchPetsInCityService(petsRepository)

  return service
}
