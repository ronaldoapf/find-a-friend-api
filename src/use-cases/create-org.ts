import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { PasswordDoesntMatches } from './errors/password-doesnt-matches-error'

interface CreateOrgUseCaseRequest {
  cep: string
  city: string
  email: string
  phone: string
  state: string
  address: string
  password: string
  neighborhood: string
  confirmPassword: string
  responsible_name: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cep,
    email,
    phone,
    state,
    city,
    address,
    password,
    neighborhood,
    confirmPassword,
    responsible_name,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    if (password !== confirmPassword) {
      throw new PasswordDoesntMatches()
    }

    const org = await this.orgsRepository.create({
      cep,
      city,
      state,
      email,
      phone,
      address,
      neighborhood,
      responsible_name,
      password_hash: await hash(password, 6),
      latitude,
      longitude,
    })

    return { org }
  }
}
