import { InMemoryUserRepository } from 'in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { CreateUserService } from '../create-user'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: InMemoryUserRepository
// System Under Test
let sut: CreateUserService

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new CreateUserService(usersRepository)
  })

  test('should be able to create an user', async () => {
    const { user } = await sut.execute({
      email: 'user01@user.com',
      name: 'User-01',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to create an user with same email', async () => {
    const email = 'user01@user.com'

    await sut.execute({
      email,
      name: 'User-01',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'User-02',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
