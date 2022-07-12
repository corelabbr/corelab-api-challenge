import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async index(_ctx: HttpContextContract) {
    const vehicles = await Vehicle.all()

    return vehicles
  }

  public async create({ request }: HttpContextContract) {
    const params = request.only(['name', 'description', 'plate', 'year', 'color', 'price'])

    const vehicle = await Vehicle.create({
      name: params.name,
      description: params.description,
      plate: params.plate,
      year: params.year,
      color: params.color,
      price: params.price,
    })
    return vehicle
  }
  public async show({ request }: HttpContextContract) {
    const params = request.params()

    const vehicle = await Vehicle.find(params.id)
    return vehicle
  }

  public async update({ request }: HttpContextContract) {
    const params = request.params()
    const vehicleParams = request.only(['name', 'description', 'plate', 'year', 'color', 'price'])

    const vehicle = await Vehicle.find(params.id)
    vehicle?.merge(vehicleParams)
    vehicle?.save()

    return vehicle
  }
  public async delete({ request }: HttpContextContract) {
    const params = request.params()

    const vehicle = await Vehicle.find(params.id)
    vehicle?.delete()
    return {}
  }
}
