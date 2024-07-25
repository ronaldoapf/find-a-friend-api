import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  age: string
  name: string
  size: string
  about: string
  orgId: string
  environment: string
  requirements: string
  energy_level: string
  independency_level: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    about,
    age,
    energy_level,
    environment,
    independency_level,
    name,
    requirements,
    size,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new Error('Org doesn`t exists')
    }

    const pet = await this.petsRepository.create({
      age,
      name,
      size,
      about,
      environment,
      energy_level,
      requirements,
      independency_level,
      org_id: orgId,
    })

    return { pet }
  }
}
