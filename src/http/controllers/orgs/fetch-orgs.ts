import { makeFetchOrgsUseCase } from '@/use-cases/factories/make-fetch-orgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchOrgs(request: FastifyRequest, reply: FastifyReply) {
  const fetchOrgsUseCase = makeFetchOrgsUseCase()

  const orgs = await fetchOrgsUseCase.execute()
  return reply.status(200).send(orgs)
}
