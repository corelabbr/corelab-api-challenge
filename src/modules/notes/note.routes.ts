import { Router } from 'express'
import { noteController } from './note.controllers'

const noteRoutes = Router()

noteRoutes.post('/', noteController.create)
noteRoutes.put('/:id', noteController.update)
noteRoutes.delete('/:id', noteController.delete)
noteRoutes.get('/:id', noteController.findById)
noteRoutes.get('/', noteController.findAll)
noteRoutes.get('/favorites', noteController.findFavorites)

export { noteRoutes }
