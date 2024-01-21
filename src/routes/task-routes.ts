import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  registerTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getAllTasksHandler
} from '../controllers/task-controller'


export default async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/', {
    schema: {
      body: {
        title: { type: 'string' },
        body: { type: 'string' },
        favorited: { type: 'boolean' }
      }
    },
  },registerTaskHandler)
  fastify.put('/', {
    schema: {
      body: {
        title: { type: 'string' },
        body: { type: 'string' },
        favorited: { type: 'boolean' }
      }
    },
  }, updateTaskHandler)
  fastify.delete('/:id', {
    schema: {
      params: {
        id: { type: 'string' },
      }
    },
  }, deleteTaskHandler)
  fastify.get('/:id', {
    schema: {
      params: {
        id: { type: 'string' },
      }
    },
  },getTaskByIdHandler)
  fastify.get('/', getAllTasksHandler)
}
