import { prismaClient } from "../prisma";
import { TodoRequest } from "../types/todo";

export class CreateTodoService {
  async execute({
    title,
    description,
    completed,
    color,
    favorite,
  }: TodoRequest) {
    const newTodo = await prismaClient.todo.create({
      data: {
        title,
        description,
        completed: completed === "true" ? true : false,
        color,
        favorite: favorite === "true-" ? true : false,
      },
    });

    return newTodo;
  }
}
