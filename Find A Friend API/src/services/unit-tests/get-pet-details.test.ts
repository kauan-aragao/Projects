import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPetsRepository } from 'in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from 'in-memory/in-memory-orgs-repository'
import { GetPetDetailsService } from '../get-pet-details'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
// System Under Test
let sut: GetPetDetailsService

describe('Get Pet Details Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsService(petsRepository)
  })

  test('should be able to get pet details', async () => {
    await orgsRepository.create({
      id: 'org-01',
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    await petsRepository.create({
      age: 'Young',
      city: 'City Pet 1',
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Male',
      size: 'Medium',
      id: 'pet-01',
    })

    const { pet } = await sut.execute({ id: 'pet-01' })

    expect(pet.id).toEqual('pet-01')
  })

  test('should not be able to get pet details with inexisting id', async () => {
    await expect(() => sut.execute({ id: 'pet-01' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
