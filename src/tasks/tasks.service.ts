import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      status: createTaskDto.status || TaskStatus.PENDING,
      color: createTaskDto.color || '#3B82F6',
      isFavorite: createTaskDto.isFavorite || false,
    });

    return await this.taskRepository.save(task);
  }

  async findAll(
    page = 1,
    limit = 10,
    status?: TaskStatus,
    isFavorite?: boolean,
    search?: string,
  ): Promise<{ tasks: Task[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Task> = {};

    if (status) {
      where.status = status;
    }

    if (typeof isFavorite === 'boolean') {
      where.isFavorite = isFavorite;
    }

    let queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (Object.keys(where).length > 0) {
      Object.entries(where).forEach(([key, value], index) => {
        if (index === 0) {
          queryBuilder = queryBuilder.where(`task.${key} = :${key}`, { [key]: value });
        } else {
          queryBuilder = queryBuilder.andWhere(`task.${key} = :${key}`, { [key]: value });
        }
      });
    }

    if (search) {
      const searchCondition = `(task.title ILIKE :search OR task.description ILIKE :search)`;
      if (Object.keys(where).length > 0) {
        queryBuilder = queryBuilder.andWhere(searchCondition, { search: `%${search}%` });
      } else {
        queryBuilder = queryBuilder.where(searchCondition, { search: `%${search}%` });
      }
    }

    const [tasks, total] = await queryBuilder
      .orderBy('task.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return { tasks, total, totalPages };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async toggleFavorite(id: string): Promise<Task> {
    const task = await this.findOne(id);
    task.isFavorite = !task.isFavorite;
    return await this.taskRepository.save(task);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findOne(id);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async getTasksByStatus(): Promise<{ [key in TaskStatus]: number }> {
    const tasks = await this.taskRepository.find();
    
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {
        [TaskStatus.PENDING]: 0,
        [TaskStatus.IN_PROGRESS]: 0,
        [TaskStatus.COMPLETED]: 0,
      },
    );
  }
}