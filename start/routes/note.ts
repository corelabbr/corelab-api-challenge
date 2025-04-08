import Route from '@ioc:Adonis/Core/Route'

Route.get('/notes', 'NotesController.index')
Route.post('/notes', 'NotesController.create')
Route.put('/notes/:id', 'NotesController.update')
Route.delete('/notes/:id', 'NotesController.delete')
