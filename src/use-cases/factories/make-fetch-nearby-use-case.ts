import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchNearbyOrgsUseCase } from '../fetch-nearby'

export function makeFetchNearbyUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const useCase = new FetchNearbyOrgsUseCase(orgRepository)

  return useCase
}
