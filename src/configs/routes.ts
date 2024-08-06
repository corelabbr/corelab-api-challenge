import { Router } from 'express'
import { noteRoutes } from '../modules/notes/note.routes'

const routes = Router()

routes.use('/notes', noteRoutes)

export { routes }
