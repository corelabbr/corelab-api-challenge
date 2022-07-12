/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { Vehicle } from 'App/Types/Vehicle'
import { validate, IsInt, Length, Min, Max, IsDate } from 'class-validator'
import { uid } from 'uid'

let data: Array<Vehicle> = []

export class VehicleData {
  @Length(10)
  id: string

  @Length(3, 15)
  name: string
  description: string
  color: string

  @Length(3, 8)
  plate: string

  @IsInt()
  @Min(0)
  price: number

  @IsInt()
  @Min(1800)
  @Max(2022)
  year: number

  isFavorite: boolean

  @IsDate()
  createdAt: Date
}

export default class VehiclesController {
  // create

  public async create(ctx: HttpContextContract) {
    const { request, response }: { request: RequestContract; response: ResponseContract } = ctx
    const { requestBody }: any = request
    let post = new VehicleData()

    post.name = requestBody.name
    post.description = requestBody.description
    post.color = requestBody.color
    post.year = requestBody.year
    post.isFavorite = false
    post.plate = requestBody.plate
    post.price = requestBody.price
    post.id = uid(15)
    post.createdAt = new Date()

    await validate(post).then((errors) => {
      if (errors.length > 0) {
        return response.status(400).send('Consulte a documentação desta api.')
      } else {
        data.push(post)
        return null
      }
    })
  }

  // read

  public async download(_ctx: HttpContextContract) {
    return data
  }

  // update

  public async update(ctx: HttpContextContract) {
    const { request }: { request: RequestContract; response: ResponseContract } = ctx
    const { requestBody }: any = request
    const { id, name, description, plate, isFavorite, year, color, price } = requestBody

    data.filter((item) => {
      item.id === id
        ? ((item.name = name !== undefined ? name : item.name),
          (item.description = description !== undefined ? description : item.description),
          (item.plate = plate !== undefined ? plate : item.plate),
          (item.isFavorite = isFavorite !== undefined ? isFavorite : item.isFavorite),
          (item.year = year !== undefined ? year : item.year),
          (item.color = color !== undefined ? color : item.color),
          (item.price = price !== undefined ? price : item.price))
        : null
    })

    return null
  }

  // delete
  public async delete(ctx: HttpContextContract) {
    const { request }: { request: RequestContract; response: ResponseContract } = ctx
    const { requestBody }: any = request
    const { id } = requestBody

    data = data.filter((item) => item.id !== id)
  }
}
