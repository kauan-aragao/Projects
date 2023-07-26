import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getDetails } from './get-details'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyRole } from '@/http/middlewares/verify-role'
import { filter } from './filter'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets/:orgId', { onRequest: [verifyRole('Org')] }, create)

  app.get('/pets/:id', getDetails)
  app.get('/pets', filter)
}
