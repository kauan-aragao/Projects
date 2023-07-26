import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FilterPetsByCaracteristicService } from '../filter-pets-by-caracteristic'

export function MakeFilterPetsByCaracteristicsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new FilterPetsByCaracteristicService(petsRepository)

  return service
}
