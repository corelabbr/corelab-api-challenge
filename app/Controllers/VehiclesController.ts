import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Vehicle from 'App/Models/Vehicle';
import { IVehicle } from 'App/Types/Vehicle';

export default class VehiclesController {

	public async index({}: HttpContextContract){
		try {

			const vehicle: IVehicle[] = await Vehicle.all();

			return vehicle;

		} catch (err) {
			
			return {
				code: 404,
				message: err.message

			};
		}
	}

	public async show({ params }: HttpContextContract) {
		try {
			
			const vehicle: IVehicle = await Vehicle.findOrFail(params.id);

			return vehicle;

		} catch (err) {
			
			return {
				code: 404,
				message: err.message

			};
		}
	}

	public async store({ request }: HttpContextContract) {
		try {
			
			const createData = request.all();

			const vehicle: IVehicle = await Vehicle.create(createData);

			return vehicle;

		} catch (err) {
			
			return {
				code: 404,
				message: err.message

			};
		}
	}

	public async update({ request, params }: HttpContextContract) {
		try {
			
			const updateData = request.all();

			const vehicle = await Vehicle.findOrFail(params.id);

			vehicle.merge(updateData);

			await vehicle.save();

			return vehicle;


		} catch (err) {
			
			return {
				code: 404,
				message: err.message

			};
		}
	}

	public async destroy({ params }: HttpContextContract) {
		try {

			const vehicle = await Vehicle.findOrFail(params.id);

			await vehicle.delete();
			
		} catch (err) {
			
			return {
				code: 404,
				message: err.message

			};
		}
	}

	public async getByUserId({params}: HttpContextContract) {
		try {
			
			const vehicle: IVehicle[] = await Vehicle.query().where('userId', params.id);
			
			return vehicle;


		} catch (err) {
			return {
				code: 404,
				message: err.message
			};
		}
	}

}
