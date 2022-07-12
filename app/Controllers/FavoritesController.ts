import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class FavoritesController {
  public async update({ request }: HttpContextContract) {
    const params = request.params()
    const vehicleParams = request.only(['isFavorite'])

    const vehicle = await Vehicle.find(params.id)
    if (vehicle) {
      vehicle.isFavorite = vehicleParams.isFavorite
      vehicle?.save()
    }

    return vehicle
  }
}
