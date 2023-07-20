import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkCookieSession } from '../middlewares/check-if-exists-cookies'
import crypto from 'node:crypto'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface MealProps {
  id: string
  name: string
  date: string
  description: string
  session_id?: string | undefined
  isOnTheDiet: boolean
}

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkCookieSession] },
    async (request, reply) => {
      const createMealSchemaBody = z.object({
        name: z.string(),
        description: z.string(),
        isOnTheDiet: z.boolean(),
        date: z.string(),
      })

      const { name, description, isOnTheDiet, date } =
        createMealSchemaBody.parse(request.body)

      const dateFormat = new Date(date)

      const mealDateFormatted = format(
        dateFormat,
        "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
        {
          locale: ptBR,
        },
      )

      const { sessionId } = request.cookies

      await knex('meals').insert({
        id: crypto.randomUUID(),
        name,
        description,
        isOnTheDiet,
        session_id: sessionId,
        date: mealDateFormatted,
      })
      reply.status(201).send('Meal created successfully')
    },
  )

  app.get('/', { preHandler: [checkCookieSession] }, async (request, reply) => {
    const meals = await knex('meals').where(
      'session_id',
      request.cookies.sessionId,
    )
    reply.send({ meals })
  })

  app.get(
    '/:id',
    { preHandler: [checkCookieSession] },
    async (request, reply) => {
      const getMealSchemaParams = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealSchemaParams.parse(request.params)

      const meal = await knex('meals')
        .where({
          id,
          session_id: request.cookies.sessionId,
        })
        .first()
      if (!meal) {
        return reply.status(400).send({ error: "Meal doesn't exists" })
      }
      return reply.status(200).send({ meal })
    },
  )

  app.patch(
    '/:id',
    { preHandler: [checkCookieSession] },
    async (request, reply) => {
      const updateMealSchemaQuery = z.object({
        name: z.string().nullish(),
        description: z.string().nullish(),
        isOnTheDiet: z.boolean().nullish(),
        date: z.string().nullish(),
      })

      const updateMealSchemaParam = z.object({
        id: z.string().uuid(),
      })

      const { name, description, isOnTheDiet, date } =
        updateMealSchemaQuery.parse(request.query)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updates: any = {}

      if (name !== undefined) {
        updates.name = name
      }
      if (description !== undefined) {
        updates.description = description
      }
      if (isOnTheDiet !== undefined) {
        updates.isOnTheDiet = isOnTheDiet
      }
      if (date !== undefined) {
        updates.date = date
      }

      if (Object.keys(updates).length === 0) {
        return reply.status(400).send({ error: 'No updates provided' })
      }

      const { id } = updateMealSchemaParam.parse(request.params)

      await knex('meals')
        .where({
          id,
          session_id: request.cookies.sessionId,
        })
        .update(updates)

      return reply.status(200).send('The meal has been updated')
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkCookieSession] },
    async (request, reply) => {
      const getMealSchemaParams = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealSchemaParams.parse(request.params)

      const meal = await knex('meals')
        .where({
          session_id: request.cookies.sessionId,
          id,
        })
        .first()

      if (!id || !meal) {
        return reply.status(400).send({ error: "Meal doesn't exists" })
      }
      await knex('meals').where({ id }).del()
      return reply.status(200).send('Meal successfully deleted')
    },
  )

  app.get(
    '/summary',
    { preHandler: [checkCookieSession] },
    async (request, reply) => {
      const meals = await knex('meals').where(
        'session_id',
        request.cookies.sessionId,
      )

      const mealsOnTheDiet = await knex('meals').where({
        session_id: request.cookies.sessionId,
        isOnTheDiet: true,
      })

      function getTheBestSequenceOfMealsOnTheDiet(meals: MealProps[]) {
        const sequences = meals.map((meal) => meal.isOnTheDiet)
        const sequencesOfOnes = sequences.join('').split('0')
        const largestSequence = Math.max(
          ...sequencesOfOnes.map((sequence) => sequence.length),
        )

        return largestSequence
      }

      const indexOfFirstMealOutOfDiet =
        getTheBestSequenceOfMealsOnTheDiet(meals)
      const bestSequenceOfMealsOnTheDiet = indexOfFirstMealOutOfDiet
      const mealsNotOnTheDiet = meals.length - mealsOnTheDiet.length

      const summary = {
        'Quantity of meals': meals.length,
        'Quantity of meals on the diet': mealsOnTheDiet.length,
        'Quantity of meals out of the diet': mealsNotOnTheDiet,
        'Best sequence of meals on the diet': bestSequenceOfMealsOnTheDiet,
      }

      return reply.status(200).send(summary)
    },
  )
}
