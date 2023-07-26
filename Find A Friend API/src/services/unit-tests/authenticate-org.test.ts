import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrgsRepository } from 'in-memory/in-memory-orgs-repository'
import { AuthenticateOrgService } from '../authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '../errors/invalid-credential-error'

let orgsRepository: InMemoryOrgsRepository
// System Under Test
let sut: AuthenticateOrgService

describe('Authenticate Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgService(orgsRepository)
  })

  test('should be able to authenticate an org login', async () => {
    await orgsRepository.create({
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    const { org } = await sut.execute({
      email: 'org01@org.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  test('should not be able to authenticate an org with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'org01@org.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  test('should not be able to authenticate an org with wrong password', async () => {
    await orgsRepository.create({
      email: 'org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '1312999842',
    })

    await expect(() =>
      sut.execute({
        email: 'org01@org.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
