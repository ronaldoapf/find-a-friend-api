import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an org', async () => {
    const password = '1234567'
    const email = 'johndoe@example.com'

    await request(app.server).post('/orgs').send({
      email,
      password,
      cep: '38412074',
      city: 'Uberlândia',
      phone: '34991192543',
      state: 'Minas Gerais',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      confirmPassword: password,
      responsible_name: 'John Doe',
      address: 'Rua Real Grandeza, 233',
    })

    const response = await request(app.server).post('/orgs/sessions').send({
      email,
      password,
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
