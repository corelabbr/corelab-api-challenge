import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async index({}: HttpContextContract) {
    let allVehicles = await Vehicle.all()

    return allVehicles
  }

  public async store({ request }: HttpContextContract) {
    let myData = request.only([
      'name',
      'description',
      'plate',
      'isfavorite',
      'year',
      'color',
      'price',
    ])

    const myVehicle = await Vehicle.create(myData)

    return myVehicle
  }

  public async show({ params, response }: HttpContextContract) {
    let vehicleId = params.id

    const myVehicle = await Vehicle.find(vehicleId)

    if (!myVehicle) {
      response.notFound()
    }

    return myVehicle
  }

  public async delete({ params, response }: HttpContextContract) {
    let vehicleId = params.id

    const myVehicle = await Vehicle.find(vehicleId)

    if (!myVehicle) {
      response.status(404)
    }

    await myVehicle?.delete()

    return myVehicle
  }

  public async update({ params, request, response }: HttpContextContract) {
    const vehicleId = params.id
    const myVehicle = await Vehicle.find(vehicleId)

    if (!myVehicle) {
      response.status(404)
    }

    let myData = request.only([
      'name',
      'description',
      'plate',
      'isfavorite',
      'year',
      'color',
      'price',
    ])

    myVehicle?.merge(myData)

    await myVehicle?.save()

    return myVehicle
  }
}
