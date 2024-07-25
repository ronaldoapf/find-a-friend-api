import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    const org = await prisma.org.create({
      data: {
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
      },
    })

    await request(app.server).post('/orgs').send(org)

    const response = await request(app.server).post('/orgs/authenticate').send({
      email: org.email,
      password: org.password_hash,
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
