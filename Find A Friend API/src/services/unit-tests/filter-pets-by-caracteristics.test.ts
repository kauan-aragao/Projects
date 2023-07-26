import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPetsRepository } from 'in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from 'in-memory/in-memory-orgs-repository'
import { FilterPetsByCaracteristicService } from '../filter-pets-by-caracteristic'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
// System Under Test
let sut: FilterPetsByCaracteristicService

describe('Filet Pets by caracteristics Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsByCaracteristicService(petsRepository)
  })

  test('should be able to list filtered pets by age', async () => {
    await orgsRepository.create({
      id: 'org-01',
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    const age = 'Puppy'

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
      age,
      city: 'City Pet 1',
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Male',
      size: 'Medium',
      id: 'pet-02',
    })

    const { pets } = await sut.execute({ age })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        age,
      }),
    ])
  })

  test('should be able to list filtered pets by size', async () => {
    await orgsRepository.create({
      id: 'org-01',
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    const size = 'Big'

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
      age: 'Puppy',
      city: 'City Pet 1',
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Male',
      size,
      id: 'pet-02',
    })

    const { pets } = await sut.execute({ size })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        size,
      }),
    ])
  })

  test('should be able to list filtered pets by sex', async () => {
    await orgsRepository.create({
      id: 'org-01',
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    const sex = 'Male'

    await petsRepository.create({
      age: 'Young',
      city: 'City Pet 1',
      name: 'Test Animal',
      org_id: 'org-01',
      sex,
      size: 'Medium',
      id: 'pet-01',
    })

    await petsRepository.create({
      age: 'Puppy',
      city: 'City Pet 1',
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Female',
      size: 'Medium',
      id: 'pet-02',
    })

    const { pets } = await sut.execute({ sex })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        sex,
      }),
    ])
  })

  test('should be able to list filtered pets by city', async () => {
    await orgsRepository.create({
      id: 'org-01',
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    const city = 'City Pet 1'

    await petsRepository.create({
      age: 'Young',
      city,
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Male',
      size: 'Medium',
      id: 'pet-01',
    })

    await petsRepository.create({
      age: 'Puppy',
      city: 'City Pet 2',
      name: 'Test Animal',
      org_id: 'org-01',
      sex: 'Male',
      size: 'Medium',
      id: 'pet-02',
    })

    const { pets } = await sut.execute({ city })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        city,
      }),
    ])
  })
})
