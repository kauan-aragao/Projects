import { Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { randomUUID } from 'node:crypto'

interface CreatePetServiceRequest {
  name: string
  city: string
  about?: string | null
  orgId: string
  age: 'Puppy' | 'Young' | 'Adult'
  size: 'Small' | 'Medium' | 'Big'
  sex: 'Male' | 'Female'
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    city,
    age,
    orgId,
    sex,
    size,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      age,
      city,
      name,
      org_id: orgId,
      sex,
      size,
      id: randomUUID(),
    })

    return { pet }
  }
}
