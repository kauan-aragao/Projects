import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Create Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create a pet', async () => {
    const { token, orgId } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post(`/pets/${orgId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 'Puppy',
        sex: 'Male',
        city: 'Test City',
        name: 'Alfredo',
        size: 'Medium',
      })

    expect(response.statusCode).toEqual(201)
  })
})
