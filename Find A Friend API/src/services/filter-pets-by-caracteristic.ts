import { PetsFilterProps, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

type FilterPetsByCaracteristicServiceRequest = PetsFilterProps

interface FilterPetsByCaracteristicServiceResponse {
  pets: Pet[]
}

export class FilterPetsByCaracteristicService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    sex,
    size,
  }: FilterPetsByCaracteristicServiceRequest): Promise<FilterPetsByCaracteristicServiceResponse> {
    const pets = await this.petsRepository.findManyByCaracteristics({
      city,
      age,
      sex,
      size,
    })

    return { pets }
  }
}
