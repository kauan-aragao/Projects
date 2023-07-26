import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserService } from '../create-user'

export function MakeCreateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new CreateUserService(usersRepository)

  return service
}
