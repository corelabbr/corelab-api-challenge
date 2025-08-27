import Route from '@ioc:Adonis/Core/Route'

Route.get('/tasks', 'TasksController.index')
Route.post('/tasks', 'TasksController.store')
Route.get('/tasks/:id', 'TasksController.show')
Route.put('/tasks/:id', 'TasksController.update')
Route.delete('/tasks/:id', 'TasksController.destroy')
Route.put('/tasks/:id/toggleFavorite', 'TasksController.toggleFavorite')

Route.get('/vehicles', 'VehiclesController.index')
