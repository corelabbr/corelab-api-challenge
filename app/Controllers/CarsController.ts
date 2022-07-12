import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Car from 'App/Models/Car'

export default class CarsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const car = await Car.create(body)

      response.status(201)
      return {
        message: 'Carro criado com sucesso',
        data: car,
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async index() {
    try {
      const cars = await Car.query().preload('brand')

      return {
        data: cars,
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params }: HttpContextContract) {
    const car = await Car.find(params.id)

    return car
  }
}
