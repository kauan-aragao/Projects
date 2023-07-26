import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/database'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Get Pet Details Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to get pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        age: 'Puppy',
        sex: 'Male',
        city: 'Test City',
        name: 'Alfredo',
        size: 'Medium',
        org_id: 'org-id-01',
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(expect.objectContaining({ id: pet.id }))
  })
})
