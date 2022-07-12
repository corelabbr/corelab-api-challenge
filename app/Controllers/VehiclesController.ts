import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Vehicle from 'App/Models/Vehicle'
import { IVehicle } from 'App/Types/Vehicle'
 export default class VehiclesController {

  // get all vehicle
  public async index({response}: HttpContextContract) {
    const vehicles = await Vehicle.all()
    response.status(200).json(vehicles)
  }

  public async store({request,response}: HttpContextContract){
      
    const {name,description,plate,is_favorite,year,color,price} = request.all()
    const vehicle = await Vehicle.create({
      name,
      description,
      plate,
      is_favorite,
      year,
      color,
      price
    })

    response.status(200).json(vehicle)
  } 

  // show a vehicle
  public async show({params,response}:HttpContextContract){
    const vehicle = await Vehicle.findOrFail(params.id)
    response.status(200).json(vehicle)
  }
  
  // delete a vehicle
  public async destroy({params,response}:HttpContextContract){
    const vehicle = await Vehicle.findOrFail(params.id)
    await vehicle.delete()
    
    response.status(200).json({message:"Vechicle deleted"})

  }

  // update a vehicle
  public async update({params,request,response}:HttpContextContract){
    const vehicle = await Vehicle.find(params.id)    
    const dataToUpdate = request.only(
      ["name",
      "color",
      "price",
      "plate",
      "is_favorite",
      "description","year"
    ])
  
    if(vehicle){
      vehicle.merge(dataToUpdate)
      await vehicle.save()

      response.status(200).json({
        message:"Vehicle updated successfully",
        data:vehicle
      })
    }else{
      response.status(404).json({
        message:"Vehicle was not founded"
      })
    }
  }

  // favorite or Unfavorite
  public async favoriteOrUnfavorite({params,request,response}:HttpContextContract){
    const vehicle = await Vehicle.find(params.id)    
    const changeFavorite = request.only([ "is_favorite"])
  
    if(vehicle){
      vehicle.merge(changeFavorite)
      await vehicle.save()

      response.status(200).json(vehicle)
    }else{
      response.status(404).json({
        message:"Vehicle was not founded"
      })
    }
  }
}