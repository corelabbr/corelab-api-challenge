/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
  Route.get('/vehicles', 'VehiclesController.index');
  Route.get('/vehicles/:id', 'VehiclesController.show');
  Route.post('/vehicles', 'VehiclesController.store');
  Route.patch('/vehicles/:id', 'VehiclesController.update');
  Route.delete('/vehicles/:id', 'VehiclesController.destroy');
  Route.patch('/vehicles/favorite/:id', 'VehiclesController.favoriteOrUnfavorite');
   
}).prefix("/api")


