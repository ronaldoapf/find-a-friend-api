import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    const createdOrg = await request(app.server).post('/orgs').send({
      email,
      password,
      cep: '38412074',
      latitude: -18.9321218,
      longitude: -48.3030253,
      neighborhood: 'Tubalina',
      city: 'Uberlândia',
      state: 'Minas Gerais',
      phone: '34991192543',
      confirmPassword: password,
      responsible_name: 'John Doe',
      address: 'Rua Real Grandeza, 233',
    })

    const loggedUser = await request(app.server).post('/orgs/sessions').send({
      email,
      password,
    })

    const response = await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '2',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      })

    expect(response.status).toBe(201)
  })
})
