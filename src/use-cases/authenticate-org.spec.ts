import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const password = '123456'

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
      password_hash: await hash(password, 6),
    })

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    })

    expect(authenticatedOrg).toEqual(org)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123456'

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
      password_hash: await hash(password, 6),
    })

    await expect(() =>
      sut.execute({
        email: org.email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
