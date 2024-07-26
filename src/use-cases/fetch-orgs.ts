import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface FetchOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(): Promise<FetchOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findAll()

    return {
      orgs,
    }
  }
}
