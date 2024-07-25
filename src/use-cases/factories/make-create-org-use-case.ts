import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const createOrgUseCase = new CreateOrgUseCase(orgRepository)

  return createOrgUseCase
}
