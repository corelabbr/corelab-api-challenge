import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Vehicle from 'App/Models/Vehicle'

const mockVehicle = () => ({
	name: 'Sandero',
	brand: 'Fiat',
	description: 'carro novo barato',
	plate: 'AAA-1234',
	year: 2022,
	color: 'Vermelho',
	price: 120000,
})

const makeError = (rule: string, field: string, message: string, args?: any) => ({
	rule,
	field,
	message,
	args,
})

test.group('vehicles [GET]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should display all vehicles, filtered by price', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?price[min]=50&price[max]=10000000')
		response.assertStatus(200)
		response.assert?.isTrue(!!response.body()[0].id)
	})

	test('should display all vehicles', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles')
		response.assertStatus(200)
		response.assert?.isTrue(!!response.body()[0].id)
	})
})

test.group('/vehicles/filter/:color?/:year?/:price[min]?/:price[max]? [GET]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should display all vehicles, filtered by PRICE', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?price[min]=50&price[max]=10000000')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
	test('should display an empty array if none vehicles, filtered by PRICE, is found', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?price[min]=10&price[max]=20')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length === 0)
	})
	test('should display all vehicles, filtered by YEAR', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?year=2022')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
	test('should display an empty array if none vehicles, filtered by YEAR, is found', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?year=1900')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length === 0)
	})
	test('should display all vehicles, filtered by COLOR', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?color=\'Vermelho\'')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
	test('should display an empty array if none vehicles, filtered by COLOR, is found', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?color=\'José\'')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length === 0)
	})
})

test.group('/vehicles/:search/search [GET]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})
	test('should display all vehicles given the search result with NAME', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles/Sandero/search')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
	test('should display all vehicles given the search result with COLOR', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles/Vermelho/search')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
	test('should display all vehicles given the search result with DESCRIPTION', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles/carro/search')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
	test('should display return an empty array if search returns it', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles/SAFDSAFSD/search')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length === 0)
	})
})

test.group('vehicles/filterOptions [GET]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should display vehicle`s filterOptions', async ({ client }) => {
		await Vehicle.createMany([mockVehicle(), mockVehicle(), { ...mockVehicle(), brand: 'Tesla' }])
		const response = await client.get('/vehicles/filter-options')
		response.assertStatus(200)
		const options = { brands: ['Fiat', 'Tesla'], years: [2022], colors: ['Vermelho'] }
		response.assert?.deepEqual(response.body(), options)
	})
})

test.group('vehicles/:id [GET]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should display vehicle by id', async ({ client }) => {
		const vehicle = await Vehicle.create(mockVehicle())
		const response = await client.get(`/vehicles/${vehicle.id}`)
		response.assertStatus(200)
		response.assert?.isTrue(!!response.body().id)
	})
})

test.group('vehicles/store [POST]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})
	test('should return an error if some field was not sent', async ({ client }) => {
		const { year, ...params } = mockVehicle() // took out year param
		const response = await client.post('/vehicles/store').form(params)
		response.assertStatus(422)
		const ERROR_MSG = 'year é necessário para fazer o post'
		response.assertBodyContains({
			errors: [makeError('required', 'year', ERROR_MSG)],
		})
	})
	test('should return an error if year field is invalid', async ({ client }) => {
		const response = await client.post('/vehicles/store').form({ ...mockVehicle(), year: 1800 })
		response.assertStatus(422)
		const ERROR_MSG = 'O campo year deve estar entre 1900 e 2022'
		response.assertBodyContains({
			errors: [makeError('range', 'year', ERROR_MSG, { start: 1900, stop: new Date().getFullYear() })],
		})
	})
	test('should add a vehicle on success', async ({ client }) => {
		const response = await client.post('/vehicles/store').form({ ...mockVehicle() })
		response.assertStatus(200)
		const id = response.body().id
		response.assert?.isTrue(!!id)
	})
	test('should display all vehicles, filtered by BRAND', async ({ client }) => {
		await Vehicle.create(mockVehicle())
		const response = await client.get('/vehicles?brand=\'Fiat\'')
		response.assertStatus(200)
		response.assert?.isTrue(response.body().length > 0)
	})
})

test.group('vehicles/:id/update [PUT]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should return an error if year field is invalid', async ({ client }) => {
		const mockedVehicle = mockVehicle()
		const vehicle = await Vehicle.create(mockedVehicle)
		const response = await client.put(`/vehicles/${vehicle.id}/update`).form({ year: 1500 })
		response.assertStatus(422)
		const ERROR_MSG = 'O campo year deve estar entre 1900 e 2022'
		response.assertBodyContains({
			errors: [makeError('range', 'year', ERROR_MSG, { start: 1900, stop: new Date().getFullYear() })],
		})
	})

	test('should update vehicle on success', async ({ client }) => {
		const mockedVehicle = mockVehicle()
		const vehicle = await Vehicle.create(mockedVehicle)
		const response = await client.put(`/vehicles/${vehicle.id}/update`).form({ name: 'BMW' })
		response.assertStatus(200)
		const updatedVehicle = await Vehicle.findBy('id', vehicle.id)
		response.assertBody({ id: vehicle.id })
		response.assert?.isTrue(updatedVehicle?.name === 'BMW')
	})
})

test.group('vehicles/:id/delete [DELETE]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should delete vehicle on success', async ({ client }) => {
		const mockedVehicle = mockVehicle()
		const vehicle = await Vehicle.create(mockedVehicle)
		const response = await client.delete(`/vehicles/${vehicle.id}/delete`)
		response.assertStatus(204)
		const deletedVehicle = await Vehicle.findBy('id', vehicle.id)
		response.assert?.isNull(deletedVehicle)
	})
})

test.group('vehicles/:id/add-favorite [PUT]', (group) => {
	group.each.setup(async () => {
		await Database.rawQuery('TRUNCATE vehicles')
	})

	test('should return an error if is_favorite field wasnt sent', async ({ client }) => {
		const mockedVehicle = mockVehicle()
		const vehicle = await Vehicle.create(mockedVehicle)
		const response = await client.put(`/vehicles/${vehicle.id}/add-favorite`)
		response.assertStatus(422)
		const ERROR_MSG = 'required validation failed'
		response.assertBodyContains({
			errors: [makeError('required', 'is_favorite', ERROR_MSG)],
		})
	})

	test('should update favorite value success', async ({ client }) => {
		const mockedVehicle = mockVehicle()
		const vehicle = await Vehicle.create({ ...mockedVehicle })
		const response = await client.put(`/vehicles/${vehicle.id}/add-favorite`).form({ is_favorite: true })
		response.assertStatus(204)
		const updatedVehicle = await Vehicle.findBy('id', vehicle.id)
		response.assert?.isTrue(updatedVehicle?.is_favorite === true)
	})
})
