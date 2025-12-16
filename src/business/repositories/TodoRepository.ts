import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Todo } from '../models/TodoModel'
import { Model } from 'mongoose'
import { PaginationTodoDto } from 'src/types/todo/dto/PaginationTodosDto'
import { CreateTodoDto } from 'src/types/todo/dto/CreateTodoDto'
import { UpdateTodoDto } from 'src/types/todo/dto/UpdateTodoDto'

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>
  ) { }

  public listTodosByPagination = async (
    dto: PaginationTodoDto,
    filters: Partial<Todo>
  ) => {
    const queryFilters: Object = {
      ...filters
    }

    if (filters.title) {
      queryFilters['title'] = { $regex: `.*${dto.term}.*`, $options: 'i' }
    }

    const query = () => this.todoModel.find(queryFilters)
    const todoList = await query()
      .limit(dto.size)
      .skip(dto.size * dto.page)
    const count = await query().countDocuments()

    return {
      data: todoList,
      total: count
    }
  }

  public createTodo = async (dto: CreateTodoDto) => {
    const createdTodo = await this.todoModel.create({
      color: dto.color,
      title: dto.title,
      isFavorite: dto.isFavorite,
      description: dto.description
    })

    return createdTodo
  }

  public deleteTodo = async (todoId: string) => {
    const deletedTodo = await this.todoModel.findOneAndDelete({
      _id: todoId
    })

    if (!deletedTodo) {
      throw new NotFoundException('Todo não encontrada')
    }

    return deletedTodo
  }

  public updateTodo = async (dto: UpdateTodoDto) => {
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { _id: dto.id },
      dto,
      { new: true }
    )

    if (!updatedTodo) {
      throw new NotFoundException('Todo não encontrada')
    }

    return updatedTodo
  }
}
