import { beforeEach, describe, expect, test } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '../errors/invalid-credential-error'
import { InMemoryUserRepository } from 'in-memory/in-memory-users-repository'
import { AuthenticateUserService } from '../authenticate-user'

let usersRepository: InMemoryUserRepository
// System Under Test
let sut: AuthenticateUserService

describe('Authenticate User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserService(usersRepository)
  })

  test('should be able to authenticate an user login', async () => {
    await usersRepository.create({
      email: 'user01@user.com',
      name: 'User-01',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'user01@user.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to authenticate an user with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'user01@user.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  test('should not be able to authenticate an user with wrong password', async () => {
    await usersRepository.create({
      email: 'user01@user.com',
      name: 'User-01',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'user01@User.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
