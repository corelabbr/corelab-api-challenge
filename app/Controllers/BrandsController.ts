import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'
import BrandValidator from 'App/Validators/BrandValidator'

export default class BrandsController {
  public async store({ request, response }: HttpContextContract) {
    const name = await BrandValidator.saveBrand(request)

    const brand = await Brand.create(name)
    response.status(201)
    return {
      data: brand,
    }
  }

  public async index() {
    const brands = await Brand.query().preload('cars')

    return {
      data: brands,
    }
  }

  public async show({ params }: HttpContextContract) {
    const brand = await Brand.find(params.id)

    return {
      data: brand,
    }
  }
}
