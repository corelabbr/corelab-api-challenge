import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IVehicle } from 'App/Types/Vehicle'

export default class VehiclesController {
  public async index(ctx: HttpContextContract) {
    const vehicles: IVehicle[] = [
      {
        id: 1,
        name: 'First Vehicle',
        description: 'This is a description of first vehicle',
        plate: 'DDT-0012',
        isFavorite: false,
        year: 2018,
        color: 'cuuu',
        price: 22000,
        createdAt: new Date(),
      },
    ]

    return vehicles
  }
}
