import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { registerTaskHandler } from '../controllers/task-controller'

export default async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.put('/', registerTaskHandler)
}
