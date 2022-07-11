import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import { IVehicle } from 'App/Types/Vehicle'

export default class VehiclesController {
    public async index() {
      let vehicles = await Vehicle.all();
      

      return {
        data: vehicles
      }
    }

    public async filter ({ request, response } :HttpContextContract){
      request.params()
    }

    
    public async store({request, response}: HttpContextContract){
      const body = request.body()

      const vehicle: IVehicle = await Vehicle.create(body);
      response.status(201);
      return {
        message: "veiculo criado com sucesso!",
        data: vehicle
      }
    }
    
    public async show({params}: HttpContextContract){
      const vehicle: IVehicle = await Vehicle.findOrFail(params.id);

      return { 
        message: "Veiculo encontrado com sucesso!",
        data: vehicle
      }
    }

    public async update({params, request} :HttpContextContract){
      const body = request.body();
      const vehicle = await Vehicle.findOrFail(params.id)

      console.log(body)
      vehicle.name = body.name;
      vehicle.isFavorite = body.isFavorite;
      vehicle.description = body.description;
      vehicle.plate = body.plate;
      vehicle.year = body.year;
      vehicle.color = body.color;
      vehicle.price = body.price;


      await vehicle.save()
      
      return {
        message: "update realizado com sucesso",
        data: vehicle
      }
    }

    public async destroy({params}: HttpContextContract){
      const vehicle = await Vehicle.findOrFail(params.id)

      await vehicle.delete()

      return {
        message: "deletado com sucesso",
        data: vehicle
      }
    }
}
