import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateUserServiceRequest {
  name: string
  email: string
  password: string
}

interface CreateUserServiceResponse {
  user: User
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}
