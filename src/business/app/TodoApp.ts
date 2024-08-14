import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from 'src/types/todo/dto/CreateTodoDto'
import { PaginationTodoDto } from 'src/types/todo/dto/PaginationTodosDto'
import { TodoRepository } from '../repositories/TodoRepository'
import { UpdateTodoDto } from 'src/types/todo/dto/UpdateTodoDto'

@Injectable()
export class TodoApp {
  constructor(private readonly todoRepository: TodoRepository) { }

  public async listTodos(dto: PaginationTodoDto) {
    const filters = this.getFilters(dto)
    const list = await this.todoRepository.listTodosByPagination(dto, filters)

    return list
  }

  public async createTodo(dto: CreateTodoDto) {
    const todo = await this.todoRepository.createTodo(dto)

    return todo
  }

  public async deleteTodo(todoId: string) {
    const todo = await this.todoRepository.deleteTodo(todoId)

    return todo
  }

  public async updateTodo(dto: UpdateTodoDto) {
    const todo = await this.todoRepository.updateTodo(dto)

    return todo
  }

  private getFilters = (dto: PaginationTodoDto) => {
    const filters = {}

    if (dto.term?.length > 2) filters['title'] = dto.term
    if (dto.color) filters['color'] = dto.color
    if (dto.favorites) filters['isFavorite'] = dto.favorites

    return filters
  }
}
