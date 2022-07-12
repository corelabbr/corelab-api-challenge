import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  
  public async index({ response }: HttpContextContract) {
    const vehicles = await Vehicle.all()
    return response.status(200).json(vehicles)
  }
  public async store({ response, request }: HttpContextContract) {
    const vehicle = await Vehicle.create(
      request.only(['name', 'description', 'plate', 'year', 'color', 'price'])
    )

    return response.status(200).json(vehicle)
  }
  public async show({}: HttpContextContract) {}

  public async update({ params, response, request }: HttpContextContract) {
    const vehicle = await Vehicle.find(params.id)

    if (!vehicle) {
      return response.status(404).json('Veiculo não encontrado')
    }
    vehicle.merge(request.only(['name', 'description', 'plate', 'year', 'color', 'price']))
    vehicle.save()

    response.status(200).json(vehicle)
  }
  public async destroy({ params, response }: HttpContextContract) {
    const vehicle = await Vehicle.find(params.id)

    if (!vehicle) {
      return response.status(404).json('Veiculo não encontrado')
    }
    vehicle.delete()

    response.status(200).json('Veiculo excluído com sucesso')
  }
}
