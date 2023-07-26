import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrgsRepository } from 'in-memory/in-memory-orgs-repository'
import { CreateOrgService } from '../create-org'
import { OrgAlreadyExistsError } from '../errors/orgs-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
// System Under Test
let sut: CreateOrgService

describe('Create Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  test('should be able to create an org', async () => {
    const { org } = await sut.execute({
      email: 'org01@org.com',
      name: 'Org-01',
      password: '123456',
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  test('should not be able to create an org with same email', async () => {
    const email = 'org01@org.com'

    await sut.execute({
      email,
      name: 'Org-01',
      password: '123456',
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'Org-01',
        password: '123456',
        address: 'Rua 1',
        city: 'Test City',
        phone: '1312999842',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
