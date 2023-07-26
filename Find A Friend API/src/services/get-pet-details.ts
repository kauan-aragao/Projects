import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsServiceRequest {
  id: string
}

interface GetPetDetailsServiceResponse {
  pet: Pet
}

export class GetPetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetDetailsServiceRequest): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
