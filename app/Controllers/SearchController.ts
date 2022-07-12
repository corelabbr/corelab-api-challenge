import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class SearchController {
  public async index({ request }: HttpContextContract) {
    const params = request.qs()
    const vehicles = await Vehicle.query()
      .where('name', 'like', `%${params.text}%`)
      .orWhere('description', 'like', `%${params.text}%`)
      .orWhere('plate', 'like', `%${params.text}%`)
      .orWhere('price', 'like', `%${params.text}%`)
      .orWhere('color', 'like', `%${params.text}%`)
      .orWhere('year', 'like', `%${params.text}%`)

    return vehicles
  }
}
