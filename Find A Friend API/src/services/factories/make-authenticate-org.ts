import { AuthenticateOrgService } from '../authenticate-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function MakeAuthenticateOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new AuthenticateOrgService(orgsRepository)

  return service
}
