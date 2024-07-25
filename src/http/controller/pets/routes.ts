import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:orgId/create', create)
  app.get('/pets/:id', getPet)
}
