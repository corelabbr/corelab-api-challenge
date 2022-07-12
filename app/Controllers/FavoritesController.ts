import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Favorite from 'App/Models/Favorite';
import { IFavorite } from 'App/Types/Favorite';

export default class FavoritesController {

	public async index({}: HttpContextContract) {
		try {
      
			const favorite: IFavorite[] = await Favorite.query().preload('vehicle');
			
			return favorite;

		} catch (err) {

			return {
				code: 404,
				message: err.message

			};
		}
	}
  
	public async show({ params }: HttpContextContract) {
		try {

			const favorite: IFavorite[] = await Favorite.query().preload('vehicle').where('userId', params.id);

			return favorite;


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

			const favorite: IFavorite = await Favorite.create(createData);

			return favorite;

		} catch (err) {
      
			return {
				code: 404,
				message: err.message

			};
		}
	}

	public async update({ params, request }: HttpContextContract) {
		try {

			const updateData = request.all();

			const favorite = await Favorite.findOrFail(params.id);

			favorite.merge(updateData);

			await favorite.save();

			return favorite;
      
		} catch (err) {
      
			return {
				code: 404,
				message: err.message

			};
		}
	}
	

	public async destroy({ params }: HttpContextContract) {
		try {
      
			const favorite = await Favorite.findOrFail(params.id);

			await favorite.delete();

		} catch (err) {
			
			return {
				code: 404,
				message: err.message

			};
		}
	}
}
