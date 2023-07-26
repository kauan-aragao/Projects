import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/database'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe.only('Filter Pets Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to list filtered pets by a caracteristic (city, age, sex, size)', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await prisma.pet.create({
      data: {
        age: 'Puppy',
        sex: 'Male',
        city: 'Test City 1',
        name: 'Alfredo',
        size: 'Medium',
        org_id: 'org-id-01',
      },
    })

    await prisma.pet.create({
      data: {
        age: 'Adult',
        sex: 'Female',
        city: 'Test City 2',
        name: 'George',
        size: 'Big',
        org_id: 'org-id-01',
      },
    })

    const age = 'Puppy'
    const sex = 'Male'
    const size = 'Medium'
    const city = 'Test City 1'

    const response = await request(app.server)
      .get(`/pets?age=${age}&sex=${sex}&size=${size}&city=${city}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ age, sex, size, city }),
    ])
  })
})
