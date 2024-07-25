import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { hash } from 'bcryptjs'

describe('Search Pets Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
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

    await petsRepository.create({
      age: '3',
      org_id: org.id,
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'indoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    await petsRepository.create({
      age: '2',
      org_id: org.id,
      name: 'Mel',
      about:
        'Eu sou um lindo doguinho de 2 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'big',
    })

    const org2 = await orgsRepository.create({
      responsible_name: 'John Doe',
      cep: '38412074',
      email: 'johndoe@example.com',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      city: 'Uberaba',
      state: 'Minas Gerais',
      phone: '34991192543',
      address: 'Rua Real Grandeza, 233',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      age: '6',
      org_id: org2.id,
      name: 'Tuka',
      about:
        'Eu sou um lindo doguinho de 6 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
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

    await petsRepository.create({
      age: '1',
      org_id: org.id,
      name: 'Jolie',
      about:
        'Eu sou um lindo doguinho de 1 ano, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })
    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Tuka',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    const { pets } = await sut.execute({ city: org.city, age: '1' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
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

    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Small dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })
    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Medium dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'medium',
    })

    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Large dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'large',
    })

    const { pets } = await sut.execute({ city: org.city, size: 'small' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy_level', async () => {
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

    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Energy low dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'low',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })
    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Energy medium dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })
    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Energy high dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    const { pets } = await sut.execute({ city: org.city, energy_level: 'low' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
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

    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Indoor dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'indoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })
    await petsRepository.create({
      age: '4',
      org_id: org.id,
      name: 'Outdoor dog',
      about:
        'Eu sou um lindo doguinho de anos anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      energy_level: 'medium',
      environment: 'outdoor',
      independency_level: 'independent',
      requirements: 'none',
      size: 'small',
    })

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(pets).toHaveLength(1)
  })
})
