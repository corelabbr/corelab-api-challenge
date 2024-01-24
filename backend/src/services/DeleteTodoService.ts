import { prismaClient } from "../prisma";

export class DeleteTodoService {
  async execute(id: string) {
    const deleteTodo = prismaClient.todo.delete({ where: { id } });

    return deleteTodo;
  }
}
