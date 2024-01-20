import { FastifyReply, FastifyRequest } from 'fastify'
import TaskUseCase from '../app/usecases/task-usecase'
import TaskRepositoryHandler from '../app/repositories/task-repository-handler'
import { TaskDTO } from '../models/task'

export async function registerTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { title, body, favorited, color } = request.body as TaskDTO

  if (!title || !body || !favorited || !color) {
    reply.code(400).send({ error: 'Missing params' })
  }

  const repository = new TaskRepositoryHandler()
  const task = new TaskUseCase(repository)
  try {
    const newTask = await task.createTask({ title, body, favorited, color })
    reply.code(200).send({ msg: 'Task created successfully', data: newTask })
  } catch (error) {
    reply.code(500).send(error)
  }
}

export async function updateTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id, title, body, favorited, color } = request.body as TaskDTO

  if (!id || !title || !body || !color) {
    reply.code(400).send({ error: 'Missing params' })
  }

  const repository = new TaskRepositoryHandler()
  const task = new TaskUseCase(repository)
  try {
    const updatedTask = await task.updateTask({ id, title, body, favorited, color })
    reply.code(200).send({ msg: 'Task updated successfully', data: updatedTask })
  } catch (error) {
    reply.code(500).send(error)
  }
}

export async function deleteTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as TaskDTO

  if (!id) {
    reply.code(400).send({ error: 'Missing params' })
  }

  const repository = new TaskRepositoryHandler()
  const task = new TaskUseCase(repository)
  try {
    await task.deleteTask(id)
    reply.code(200).send({ msg: 'Task deleted successfully' })
  } catch (error) {
    reply.code(500).send(error)
  }
}

export async function getTaskByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as TaskDTO

  if (!id) {
    reply.code(400).send({ error: 'Missing params' })
  }

  const repository = new TaskRepositoryHandler()
  const task = new TaskUseCase(repository)
  try {
    const taskById = await task.getTaskById(id)
    reply.code(200).send({ msg: 'Task found successfully', data: taskById })
  } catch (error) {
    reply.code(500).send(error)
  }
}

export async function getAllTasksHandler(request: FastifyRequest, reply: FastifyReply) {
  const repository = new TaskRepositoryHandler()
  const task = new TaskUseCase(repository)
  try {
    const tasks = await task.getAllTasks()
    reply.code(200).send({ msg: 'Tasks found successfully', data: tasks })
  } catch (error) {
    reply.code(500).send(error)
  }
}
