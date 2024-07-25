import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { PetNotFoundError } from './errors/pet-not-found-error'

describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase
  const orgsRepository = new InMemoryOrgsRepository()

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const org = await orgsRepository.create({
      responsible_name: 'John Doe',
      cep: '38412074',
      email: 'johndoe@example.com',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      city: 'Uberlândia',
      state: 'Minas Gerais',
      phone: '34991192543',
      address: 'Rua Real Grandeza, 233',
      password_hash: await hash('123456', 6),
    })

    const createdPet = await petsRepository.create({
      age: '2',
      name: 'Alfredo',
      org_id: org.id,
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'indoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    const result = await sut.execute({ id: createdPet.id })

    expect(result.pet).toEqual(createdPet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
