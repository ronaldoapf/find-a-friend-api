import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { PasswordDoesntMatches } from '@/use-cases/errors/password-doesnt-matches-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    responsible_name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    phone: z.string(),
    password: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    confirmPassword: z.string(),
    state: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const data = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    const { org } = await createOrgUseCase.execute(data)
    return reply.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    } else if (err instanceof PasswordDoesntMatches) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
