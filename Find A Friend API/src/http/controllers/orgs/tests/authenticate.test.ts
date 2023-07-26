import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate Org Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to authenticate an org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org-01',
      email: 'org01@org.com',
      password: '123456',
      phone: '13199982',
      address: 'Rua 1',
      city: 'Test City',
    })

    const response = await request(app.server).post('/orgsauth').send({
      email: 'org01@org.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
