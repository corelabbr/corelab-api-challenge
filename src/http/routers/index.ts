import { FastifyInstance } from 'fastify'
import { NotesRoutes } from './notes'

export async function routes(app: FastifyInstance) {
  app.register(NotesRoutes)
}
