import { app } from '@/app'
import request from 'supertest'
import { test, afterAll, beforeAll, describe, expect } from 'vitest'

describe('Refresh Org token Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to refresh token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org-01',
      email: 'org01@org.com',
      password: '123456',
      phone: '13199982',
      address: 'Rua 1',
      city: 'Test City',
    })

    const authResponse = await request(app.server).post('/orgsauth').send({
      email: 'org01@org.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
