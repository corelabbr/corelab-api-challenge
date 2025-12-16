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

Route.get('/vehicles', 'VehiclesController.index')

Route.post('/notas', 'NotasController.inserirNotas')

Route.get('/notasidget/:id', 'NotasController.getIdNotas')

Route.get('/notasgetall', 'NotasController.getAllNotas')

Route.delete('/notasdelet/:id', 'NotasController.deleteNota')

Route.put('/notasedit/:id', 'NotasController.updateNota')

Route.get('/notasfav', 'NotasController.getAllNotasFav')

Route.get('/notasnofav', 'NotasController.getAllNotasNoFav')

Route.get('/cor/:id', 'NotasController.getIdcor')
