import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrgsRepository } from 'in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'in-memory/in-memory-pets-repository'
import { CreatePetService } from '../create-pet'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
// System Under Test
let sut: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(petsRepository, orgsRepository)
  })

  test('should be able to create an pet', async () => {
    await orgsRepository.create({
      id: 'org-01',
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    const { pet } = await sut.execute({
      age: 'Young',
      city: 'Test City',
      name: 'Test Animal',
      orgId: 'org-01',
      sex: 'Male',
      size: 'Medium',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  test('should not be able to create an pet with inexisting org id', async () => {
    await expect(() =>
      sut.execute({
        age: 'Young',
        city: 'Test City',
        name: 'Test Animal',
        orgId: 'org-01',
        sex: 'Male',
        size: 'Medium',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
