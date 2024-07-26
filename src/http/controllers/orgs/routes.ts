import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { fetchNearby } from './fetch-nearby'
import { fetchOrgs } from './fetch-orgs'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs/sessions', authenticate)
  app.post('/orgs', create)

  app.get('/orgs/nearby', fetchNearby)
  app.get('/orgs', fetchOrgs)
}
