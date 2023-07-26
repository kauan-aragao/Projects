import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to authenticate an user', async () => {
    await request(app.server).post('/users').send({
      name: 'User-01',
      email: 'user@user.com',
      password: '123456',
    })

    const response = await request(app.server).post('/usersauth').send({
      email: 'user@user.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
