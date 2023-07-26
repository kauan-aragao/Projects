import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialError } from './errors/invalid-credential-error'

interface AuthenticateOrgServiceRequest {
  email: string
  password: string
}

interface AuthenticateOrgServiceResponse {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { org }
  }
}
