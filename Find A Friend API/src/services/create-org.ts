import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/orgs-already-exists-error'

interface CreateOrgServiceRequest {
  name: string
  email: string
  password: string
  city: string
  address: string
  phone: string
}

interface CreateOrgServiceResponse {
  org: Org
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    name,
    password,
    address,
    city,
    phone,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      email,
      name,
      password_hash,
      address,
      city,
      phone,
    })

    return { org }
  }
}
