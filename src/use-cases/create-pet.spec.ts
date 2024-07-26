import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { hash } from 'bcryptjs'
import { OrgNotFoundError } from './errors/org-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
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

    const { pet } = await sut.execute({
      age: '2',
      orgId: org.id,
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'indoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with a non-existing org', async () => {
    await expect(() =>
      sut.execute({
        age: '2',
        orgId: 'non-existing-org',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
