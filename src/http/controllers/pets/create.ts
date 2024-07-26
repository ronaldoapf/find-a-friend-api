import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().max(300),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independency_level: z.string(),
    environment: z.string(),
    requirements: z.string(),
  })

  const { orgId } = createPetParamsSchema.parse(request.params)

  const {
    about,
    age,
    energy_level,
    name,
    size,
    requirements,
    environment,
    independency_level,
  } = createPetBodySchema.parse(request.body)

  const createPetsUseCase = makeCreatePetUseCase()

  try {
    const pet = await createPetsUseCase.execute({
      about,
      age,
      energy_level,
      name,
      size,
      requirements,
      environment,
      independency_level,
      orgId,
    })

    reply.status(201).send(pet)
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
