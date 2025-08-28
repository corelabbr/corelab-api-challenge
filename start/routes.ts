import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => ({ Rota_Está_Funcionando: true }))

Route.get('/tasks', 'TasksController.index')
Route.get('/tasks/:id', 'TasksController.show')
Route.post('/tasks', 'TasksController.store')
Route.patch('/tasks/:id', 'TasksController.update')
Route.delete('/tasks/:id', 'TasksController.destroy')
