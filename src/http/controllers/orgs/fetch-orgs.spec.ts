import { app } from '@/app'
import request from 'supertest'

import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Fetch Orgs (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby orgs', async () => {
    const org = {
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
    }

    await request(app.server).post('/orgs').send(org).expect(201)

    await request(app.server)
      .post('/orgs')
      .send({
        ...org,
        email: 'johndoe1@gmail.com',
      })
      .expect(201)

    const response = await request(app.server).get('/orgs').expect(200)

    expect(response.body.orgs).toHaveLength(2)
  })
})
