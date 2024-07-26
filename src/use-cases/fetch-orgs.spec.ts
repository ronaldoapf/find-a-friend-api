import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { FetchOrgsUseCase } from './fetch-orgs'

describe('Fetch Orgs Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: FetchOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsUseCase(orgsRepository)
  })

  it('should be able to fetch orgs', async () => {
    await orgsRepository.create({
      responsible_name: 'John Doe',
      cep: '38412074',
      email: 'johndoe@example.com',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      city: 'Uberlândia',
      state: 'Minas Gerais',
      phone: '34991192543',
      password_hash: await hash('123456', 6),
      address: 'Rua Real Grandeza, 233',
    })

    const orgs = await sut.execute()

    expect(orgs.orgs).toHaveLength(1)
  })
})
