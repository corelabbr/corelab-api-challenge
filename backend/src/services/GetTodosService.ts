import { prismaClient } from "../prisma";

export class GetTodosService {
  async execute() {
    const todos = prismaClient.todo.findMany();

    return todos;
  }
}
