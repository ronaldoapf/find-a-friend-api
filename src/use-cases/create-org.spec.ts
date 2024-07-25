import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { PasswordDoesntMatches } from './errors/password-doesnt-matches-error'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      responsible_name: 'John Doe',
      cep: '38412074',
      email: 'johndoe@example.com',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      city: 'Uberlândia',
      state: 'Minas Gerais',
      phone: '34991192543',
      password: '123456',
      confirmPassword: '123456',
      address: 'Rua Real Grandeza, 233',
    })

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a org that already exists', async () => {
    await sut.execute({
      responsible_name: 'John Doe',
      cep: '38412074',
      email: 'johndoe@example.com',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      city: 'Uberlândia',
      state: 'Minas Gerais',
      phone: '34991192543',
      password: '123456',
      confirmPassword: '123456',
      address: 'Rua Real Grandeza, 233',
    })

    await expect(() =>
      sut.execute({
        responsible_name: 'John Doe',
        cep: '38412074',
        email: 'johndoe@example.com',
        latitude: -18.9321218,
        longitude: -48.3030253,
        neighborhood: 'Tubalina',
        city: 'Uberlândia',
        state: 'Minas Gerais',
        phone: '34991192543',
        password: '123456',
        confirmPassword: '1234567',
        address: 'Rua Real Grandeza, 233',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('not should be able to create a org if passwords doesnt matches', async () => {
    await expect(() =>
      sut.execute({
        responsible_name: 'John Doe',
        cep: '38412074',
        email: 'johndoe@example.com',
        latitude: -18.9321218,
        longitude: -48.3030253,
        neighborhood: 'Tubalina',
        city: 'Uberlândia',
        state: 'Minas Gerais',
        phone: '34991192543',
        password: '123456',
        confirmPassword: '1234567',
        address: 'Rua Real Grandeza, 233',
      }),
    ).rejects.toBeInstanceOf(PasswordDoesntMatches)
  })
})
