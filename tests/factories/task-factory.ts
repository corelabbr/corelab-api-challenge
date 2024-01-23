import { faker } from '@faker-js/faker'
import { taskRepository } from '@/repositories'
import { Task } from '@prisma/client'

interface FakeTask {
  title: string
  description: string
  favorite: boolean
  color?: string
}

export function createFakeTask(): FakeTask {
  return {
    title: faker.lorem.words(2),
    description: faker.lorem.sentence(),
    favorite: faker.datatype.boolean(),
    color: faker.internet.color(),
  }
}

export function createTaskRequestBody(): {
  title: string
  description: string
  favorite: boolean
  color?: string
} {
  const fakeTask = createFakeTask()
  return {
    title: fakeTask.title,
    description: fakeTask.description,
    favorite: fakeTask.favorite,
    color: fakeTask.color,
  }
}

export async function createAndSaveTask(userId: number): Promise<Task> {
  const fakeTask = createFakeTask()

  return await taskRepository.createTask(userId, fakeTask)
}
