import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  registerTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getAllTasksHandler
} from '../controllers/task-controller'

export default async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/', registerTaskHandler)
  fastify.put('/', updateTaskHandler)
  fastify.delete('/:id', deleteTaskHandler)
  fastify.get('/:id', getTaskByIdHandler)
  fastify.get('/', getAllTasksHandler)
}
