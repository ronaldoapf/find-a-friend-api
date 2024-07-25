import fastify from 'fastify'
import { orgsRoutes } from './http/controller/orgs/routes'
import { errorHandler } from './error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(orgsRoutes)

app.setErrorHandler(errorHandler)
