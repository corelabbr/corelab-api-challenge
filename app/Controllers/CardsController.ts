import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Card from 'App/Models/Card'

export default class CardsController {
  public async index({}: HttpContextContract) {
    return await Card.all()
  }

  // public async create({}: HttpContextContract) {}

  public async getById({ request }: HttpContextContract) {
    return await Card.findOrFail(request.param('id'))
  }

  public async store({ request }: HttpContextContract) {
    const card: Card = await Card.create(request.all())

    return card
  }

  // public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  public async update({ request }: HttpContextContract) {
    let card = await Card.findOrFail(request.param('id'))

    card = await card.merge(request.body()).save()

    return card
  }

  public async destroy({ request }: HttpContextContract) {
    let card = await Card.findOrFail(request.param('id'))

    return await card.delete()
  }
}
