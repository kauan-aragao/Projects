import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPetsRepository } from 'in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { FetchPetsInCityService } from '../fetch-pets-list-in-a-city'
import { InMemoryOrgsRepository } from 'in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
// System Under Test
let sut: FetchPetsInCityService

describe('Fetch Pets in a City Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsInCityService(petsRepository)
  })

  test('should be able to list pets in a specific city', async () => {
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

    await petsRepository.create({
      age: 'Young',
      city: 'City Pet 2',
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Male',
      size: 'Medium',
      id: 'pet-02',
    })

    const { pets } = await sut.execute({ city: 'City Pet 1' })

    expect(pets).toEqual([
      expect.objectContaining({
        city: 'City Pet 1',
      }),
    ])
  })
})
