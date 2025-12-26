import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AddTaskDTO, EditTaskDTO } from './dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async findOne(id: number): Promise<Task> {
    return await this.tasksRepository.findOneBy({ id });
  }

  async findUserTasks(userId: number): Promise<Task[]> {
    return await this.tasksRepository
      .createQueryBuilder('tasks')
      .innerJoinAndSelect('tasks.user', 'user')
      .where('user.id = :id', { id: userId })
      .orderBy('tasks.isFavorite', 'DESC')
      .addOrderBy('tasks.id', 'ASC')
      .getMany();
  }

  async findAllFavorites(userId: number): Promise<Task[]> {
    return await this.tasksRepository
      .createQueryBuilder('tasks')
      .innerJoinAndSelect('tasks.user', 'user')
      .where('user.id = :id', { id: userId })
      .andWhere('tasks.isFavorite = :isFavorite', { isFavorite: true })
      .orderBy('tasks.id', 'ASC')
      .getMany();
  }

  async create(taskDTO: AddTaskDTO, authorId: number): Promise<Task> {
    const task = new Task();
    task.taskTitle = taskDTO.taskTitle;
    task.description = taskDTO.description;
    task.dueDate = taskDTO.dueDate;
    task.color = taskDTO.color;

    const user = await this.usersService.findOne(authorId);
    task.user = user;

    return this.tasksRepository.save(task);
  }

  async complete(id: number): Promise<UpdateResult> {
    const task = await this.tasksRepository.findOneBy({ id });
    return await this.tasksRepository.update(id, {
      isCompleted: !task.isCompleted,
    });
  }

  async favorite(id: number): Promise<UpdateResult> {
    const task = await this.tasksRepository.findOneBy({ id });
    return await this.tasksRepository.update(id, {
      isFavorite: !task.isFavorite,
    });
  }

  update(id: number, taskDTO: EditTaskDTO): Promise<UpdateResult> {
    return this.tasksRepository.update(id, { ...taskDTO });
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id);
  }
}
