import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchNearbyOrgsUseCase } from './fetch-nearby'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

describe('Fetch Nearby Orgs Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
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
      password_hash: await hash('123456', 6),
      address: 'Rua Real Grandeza, 233',
    })

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toEqual([org])
  })
})
