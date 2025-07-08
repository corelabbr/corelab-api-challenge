import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { GetTasksDto } from './dto/get-tasks-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    const result = await this.tasksRepository.save(task);
    return result;
  }

  async findAll(query: GetTasksDto) {
    const qb = this.tasksRepository.createQueryBuilder('task');

    if (query.search) {
      qb.andWhere('task.title LIKE :search', { search: `%${query.search}%` });
    }

    if (query.favorite === 'true') {
      qb.andWhere('task.favorite = :fav', { fav: true });
    }

    if (query.color) {
      qb.andWhere('task.color = :color', { color: query.color });
    }

    const results = await qb.getMany();

    return { length: results.length, results: results };
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findBy({ id });
    return task[0];
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const result = await this.tasksRepository.update({ id }, updateTaskDto);
    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updateTaskDto;
  }

  async remove(id: number) {
    const taskToRemove = await this.findOne(id);
    const result = await this.tasksRepository.remove(taskToRemove);
    return result;
  }
}
