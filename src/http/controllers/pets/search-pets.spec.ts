import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { app } from '@/app'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
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

    await request(app.server)
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

    await request(app.server)
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

    const response = await request(app.server)
      .get('/pets')
      .query({ city: createdOrg.body.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it.skip('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets')

    expect(response.status).toBe(400)
  })

  it.skip('should be able to search pets by city and age', async () => {
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

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '1',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      })

    await request(app.server)
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

    const response = await request(app.server)
      .get('/pets')
      .query({ city: createdOrg.body.city, age: '1' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it.skip('should be able to search pets by city and size', async () => {
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

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '1',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      })

    await request(app.server)
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

    await request(app.server)
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
        size: 'medium',
      })

    await request(app.server)
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
        size: 'large',
      })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: createdOrg.body.city, age: '1' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it.skip('should be able to search pets by city and energy level', async () => {
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

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '1',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      })

    await request(app.server)
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

    await request(app.server)
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
        size: 'medium',
      })

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '2',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'low',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'large',
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: createdOrg.body.city, energy_level: 'low' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it.skip('should be able to search pets by city and environment', async () => {
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

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '1',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      })

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '2',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'outdoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'small',
      })

    await request(app.server)
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
        size: 'medium',
      })

    await request(app.server)
      .post(`/pets/${createdOrg.body.id}`)
      .set({ authorization: `Bearer ${loggedUser.body.token}` })
      .send({
        age: '2',
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        energy_level: 'medium',
        environment: 'outdoor',
        independency_level: 'independent',
        requirements: 'none',
        size: 'large',
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: createdOrg.body.city, environment: 'indoor' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
