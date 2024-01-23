import { taskRepository } from '@/repositories'
import { invalidInputError, notFoundError } from '@/errors'
import { AuthenticatedRequest } from '@/middlewares'
import { Task } from '@prisma/client'
import { CreateTaskParams, DeleteTaskParams, UpdateTaskParams } from '@/types'

async function createTaskService({
  req,
  title,
  description,
  favorite,
  color,
}: CreateTaskParams): Promise<Task> {
  const userId = req.userId

  if (
    !title ||
    title.trim() === '' ||
    !description ||
    description.trim() === '' ||
    !userId
  ) {
    throw invalidInputError('All required fields must be filled.')
  }

  if (color && !isValidHexColor(color)) {
    throw invalidInputError(
      'Invalid color format. Please provide a valid hexadecimal color code.',
    )
  }

  const newTask = await taskRepository.createTask(userId, {
    title,
    description,
    favorite: favorite || false,
    color,
  })

  return newTask
}

async function findAllTaskByUserIdService(
  req: AuthenticatedRequest,
): Promise<Task[]> {
  const userId = req.userId

  if (userId === undefined) {
    throw notFoundError('User ID is missing.')
  }

  const tasks = await taskRepository.findAllTaskByUserId(userId)

  if (!tasks || tasks.length === 0) {
    throw notFoundError(`No tasks found for the user`)
  }
  return tasks
}

async function deleteTaskService({
  req,
  taskId,
}: DeleteTaskParams): Promise<void> {
  const userId = req.userId

  if (userId === undefined) {
    throw notFoundError('User ID is missing.')
  }

  const task = await taskRepository.findTaskByIdAndUserId(
    Number(taskId),
    userId,
  )

  if (!task) {
    throw notFoundError(
      `Task with ID "${taskId}" not found for the user with ID "${userId}"`,
    )
  }

  await taskRepository.deleteTask(Number(taskId))
}

async function updateTaskService({
  req,
  taskId,
  title,
  description,
  favorite,
  color,
}: UpdateTaskParams): Promise<Task> {
  const userId = req.userId

  if (!userId) throw notFoundError('User ID is missing.')

  const existingTask = await taskRepository.findTaskByIdAndUserId(
    taskId,
    userId,
  )

  if (!existingTask) throw notFoundError('Task not found for the user')

  if (color && !isValidHexColor(color)) {
    throw invalidInputError(
      'Invalid color format. Please provide a valid hexadecimal color code.',
    )
  }

  const updatedTask = await taskRepository.updateTask(taskId, {
    title,
    description,
    favorite,
    color,
  })

  return updatedTask
}
export const taskService = {
  createTaskService,
  findAllTaskByUserIdService,
  deleteTaskService,
  updateTaskService,
}

function isValidHexColor(input: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexColorRegex.test(input)
}
