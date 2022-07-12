import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {

	Route.resource('/vehicles', 'VehiclesController').apiOnly();

	Route.resource('/favorites', 'FavoritesController').apiOnly();

	Route.get('/adverts/:id','VehiclesController.getByUserId');

}).prefix('/api');
