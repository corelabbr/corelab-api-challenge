import { FastifyReply, FastifyRequest } from 'fastify'
import TaskUseCase from '../app/usecases/task-usecase'
import TaskRepositoryHandler from '../app/repositories/task-repository-handler'
import { TaskDTO } from '../models/task'

export async function registerTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { title, body, completed, favorited, color } = request.body as TaskDTO

  if (!title || !body || !color) {
    reply.code(400).send({ error: 'Missing params' })
  }

  const repository = new TaskRepositoryHandler()
  const task = new TaskUseCase(repository)
  try {
    await task.createTask({ title, body, completed, favorited, color })
    reply.code(201).send({ msg: 'Task created successfully' })
  } catch (error) {
    reply.code(500).send(error)
  }
}
