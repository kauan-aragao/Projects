import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(request.body)

    const user = await knex('users').where('email', email).first()

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const userId = crypto.randomUUID()

      await knex('users').insert({
        email,
        password: hashedPassword,
        userId,
      })
      reply.cookie('sessionId', userId, {
        path: '/',
        maxAge: 1000 * 60 * 60, // 1 hour
      })
    } else {
      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid password')
      } else {
        reply.cookie('sessionId', user.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60, // 1 hour
        })
      }
    }
  })

  app.get('/', async (request, reply) => {
    const users = await knex('users').returning('*')
    reply.send({ users })
  })
}
