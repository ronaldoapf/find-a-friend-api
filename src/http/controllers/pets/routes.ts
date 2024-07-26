import { FastifyInstance } from 'fastify'
import { create } from './create'
import { searchPets } from './search-pets'
import { getPet } from './get-pet'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:orgId', { onRequest: [verifyJwt] }, create)
  app.get('/pets', searchPets)
  app.get('/pets/:id', getPet)
}
