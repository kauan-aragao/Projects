import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to create an user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'User-01',
      email: 'user@user.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
