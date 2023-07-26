import { prisma } from '@/database'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      id: 'org-id-01',
      email: 'Org01@org.com',
      name: 'Org-01',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      city: 'Test City',
      phone: '114199992',
    },
  })

  const authResponse = await request(app.server).post('/orgsauth').send({
    email: 'Org01@org.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token, orgId: 'org-id-01' }
}
