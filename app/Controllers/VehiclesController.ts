/* eslint-disable curly */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import AddVehicleValidator from 'App/Validators/AddVehicleValidator'
import UpdateVehicleValidator from 'App/Validators/UpdateVehicleValidator'
import AddFavoriteValidator from 'App/Validators/AddFavoriteValidator'
import Database from '@ioc:Adonis/Lucid/Database'

type Price = {
	min: string,
	max: string
}
type Filters = {
	price?: Price
	year?: string
	color?: string
	brand?: string
} | {}

type Options = {
	brands: string[],
	colors: string[],
	years: number[]
}

export default class VehiclesController {
	public async index ({ request }: HttpContextContract) {
		const filters: Filters = request.qs() as Filters
		let query = 'SELECT * FROM vehicles '
		if (Object.keys(filters).length > 0) {
			query += 'WHERE '
			const { price, year, color, brand }: any = filters

			if (price) query += `price BETWEEN ${price.min} AND ${price.max} `
			if (year) query += `${query.includes('AND') ? 'AND' : ''} year = ${year} `
			if (color) query += `${query.includes('AND') ? 'AND' : ''} color = ${color} `
			if (brand) query += `${query.includes('AND') ? 'AND' : ''} brand = ${brand} `
		}
		const vehicles = (await Database.rawQuery(query)).rows
		return vehicles ?? []
	}
	public async loadFilterOptions (_ctx: HttpContextContract) {
		let query = 'SELECT DISTINCT brand, color, year FROM vehicles'
		const vehicles = (await Database.rawQuery(query)).rows

		const options: Options = { brands: [], colors: [], years: [] } as Options
		for (const vehicle of vehicles) {
			options.brands.push(vehicle.brand)
			options.years.push(vehicle.year)
			options.colors.push(vehicle.color)
		}

		const brandOptions = [...new Set(options.brands)]
		const yearOptions = [...new Set(options.years)]
		const colorOptions = [...new Set(options.colors)]
		return { brands: brandOptions, years: yearOptions, colors: colorOptions }
	}
	public async search ({ params: { search } }: HttpContextContract) {
		let query = `SELECT * FROM vehicles WHERE CONCAT(name, description, color) LIKE '%${search}%'`
		const vehicles = (await Database.rawQuery(query)).rows
		return vehicles ?? []
	}
	public async show ({ params }: HttpContextContract) {
		const vehicles = await Vehicle.findBy('id', params.id)
		if (vehicles) {
			return vehicles
		} else {
			return 'Nenhum veículo encontrado'
		}
	}
	public async store ({ request }: HttpContextContract) {
		const payload = await request.validate(AddVehicleValidator)
		const vehicle = new Vehicle()
		// store request data values to vehicle model
		for (const field of Object.keys(payload)) {
			vehicle[field] = payload[field]
		}
		const result = await vehicle.save()
		return { id: result.id }
	}
	public async update ({ request, params }: HttpContextContract) {
		const payload = await request.validate(UpdateVehicleValidator)
		const vehicle = await Vehicle.findOrFail(params.id)
		// store request data values to vehicle model
		for (const field of Object.keys(payload)) {
			vehicle[field] = payload[field]
		}
		const result = await vehicle.save()
		return { id: result.id }
	}
	public async destroy ({ params, response }: HttpContextContract) {
		await Vehicle.query().where('id', params.id).delete()
		response.status(204)
	}
	public async addFavorite ({ request, response, params }: HttpContextContract) {
		const { is_favorite } = await request.validate(AddFavoriteValidator)
		const vehicle = await Vehicle.findOrFail(params.id)
		vehicle.is_favorite = is_favorite
		await vehicle.save()
		response.status(204)
	}
}
