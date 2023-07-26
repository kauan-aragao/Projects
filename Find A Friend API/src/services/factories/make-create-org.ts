import { CreateOrgService } from '../create-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function MakeCreateOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new CreateOrgService(orgsRepository)

  return service
}
