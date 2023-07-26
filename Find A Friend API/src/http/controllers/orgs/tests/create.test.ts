import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Org Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create an org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org-01',
      email: 'org01@org.com',
      password: '123456',
      phone: '13199982',
      address: 'Rua 1',
      city: 'Test City',
    })

    expect(response.statusCode).toEqual(201)
  })
})
