import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchOrgsUseCase } from '../fetch-orgs'

export function makeFetchOrgsUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const useCase = new FetchOrgsUseCase(orgRepository)

  return useCase
}
