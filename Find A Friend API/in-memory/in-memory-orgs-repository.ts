import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: data.role ?? 'Org',
    }

    this.items.push(org)
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
