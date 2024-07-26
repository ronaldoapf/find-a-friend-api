import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { errorHandler } from './error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler(errorHandler)
