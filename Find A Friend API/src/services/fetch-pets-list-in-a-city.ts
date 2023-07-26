import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsInCityServiceRequest {
  city: string
}

interface FetchPetsInCityServiceResponse {
  pets: Pet[]
}

export class FetchPetsInCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsInCityServiceRequest): Promise<FetchPetsInCityServiceResponse> {
    const pets = await this.petsRepository.findManyByCity(city)

    return { pets }
  }
}
