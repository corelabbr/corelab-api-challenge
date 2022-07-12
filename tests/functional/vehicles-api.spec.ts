import { test } from '@japa/runner'
import Vehicle from 'App/Models/Vehicle';
import { IVehicle } from 'App/Types/Vehicle';

const defaultVehicle: Partial<IVehicle> = {
  name: 'First Vehicle',
  description: 'This is a description of first vehicle',
  plate: 'DDT-0012',
  brand: 'fiat',
  isFavorite: false,
  year: 2018,
  color: 'vermelho',
  price: 22000,
}

test('init display vehicles', async ({ client }) => {
  const response = await client.get('/vehicles')

  console.log(response.body());

  response.assertStatus(200)

  response.assertBodyContains([])
})

test('display vehicles', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.get('/vehicles')

  response.assertStatus(200)
  response.assertBodyContains([{ id: res.body().id }])
})


test('display search vehicles with name and color name', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.get('/vehicles').qs({ search: `${defaultVehicle.name} ${defaultVehicle.color}` })

  response.assertStatus(200)
  response.assertBodyContains([{ id: res.body().id }])
})

test('display search vehicles with name and color name specifc', async ({ client }) => {
  const res1 = await client.post('/vehicles').json(defaultVehicle)

  await client.post('/vehicles').json({ ...defaultVehicle, name: 'Honda City' })

  const response = await client.get('/vehicles').qs({ search: `${defaultVehicle.name} ${defaultVehicle.color}` })

  response.assertStatus(200)
  response.assertBodyContains([{ id: res1.body().id }])
})

test('display search vehicles with name and barnd name', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.get('/vehicles').qs({ search: `${defaultVehicle.name} ${defaultVehicle.brand}` })

  response.assertStatus(200)
  response.assertBodyContains([{ id: res.body().id }])
})

test('display search vehicles with full filter', async ({ client }) => {
  const filterFields: Partial<Vehicle> = { brand: 'fiat', color: 'vermelho', year: 2019, isFavorite: true };
  const vehicleFiltered = { ...defaultVehicle, ...filterFields }
  
  const res = await client.post('/vehicles').json(vehicleFiltered)

  const response = await client.get('/vehicles').qs(filterFields)

  response.assertStatus(200)
  response.assertBodyContains([{ id: res.body().id }])
})

test('create with not fields requireds vehicle', async ({ client }) => {
  const fieldsSets: Partial<IVehicle>[] = [
    { name: 'car' },
    { name: 'car', year: 2019 },
    { name: 'car', year: 2019, brand: 'fiat' },
    { name: 'car', year: 2019, brand: 'fiat', plate: 'a123' },
    { name: 'car', year: 2019, brand: 'fiat', plate: 'a123', color: 'red' },
    defaultVehicle // this is worked
  ];
  Promise.all(fieldsSets.map(async (fields, index) => {
    const response = await client.post('/vehicles').json(fields)
    return response.assertStatus((fieldsSets.length-1) === index ? 200 : 400)
  }))
})

test('create and show vehicle', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.get(`/vehicles/${res.body().id}`)

  response.assertStatus(200)
  response.assertBodyContains({ id: res.body().id })
})

test('show vehicle', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.get(`/vehicles/${res.body().id}`)

  response.assertStatus(200)
})

test('show not existing vehicle', async ({ client }) => {
  const response = await client.get(`/vehicles/${0}`)
  response.assertStatus(400)
})

test('remove vehicle', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.delete(`/vehicles/${res.body().id}`)

  response.assertStatus(200)
})

test('remove not existing vehicle', async ({ client }) => {
  const response = await client.delete(`/vehicles/${0}`)
  response.assertStatus(400)
})

test('remove vehicle and show status 400', async ({ client }) => {
  const res = await client.post('/vehicles').json(defaultVehicle)

  await client.delete(`/vehicles/${res.body().id}`)

  const response = await client.get(`/vehicles/${res.body().id}`)

  response.assertStatus(400)
})

test('update vehicle', async ({ client }) => {
  const name = 'Honda civic'
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.put(`/vehicles/${res.body().id}`).json({ name })

  response.assertStatus(200)
  response.assertBodyContains({ id: res.body().id, name })
})

test('update not exists vehicle', async ({ client }) => {
  const name = 'Honda civic'
  const response = await client.put(`/vehicles/0`).json({ name })

  response.assertStatus(400)
})

test('favorited vehicle', async ({ client }) => {
  defaultVehicle.isFavorite = false
  const res = await client.post('/vehicles').json(defaultVehicle)

  const response = await client.put(`/vehicles/${res.body().id}`).json({ isFavorite: true })

  response.assertStatus(200)
  response.assertBodyContains({ id: res.body().id, isFavorite: true })
})