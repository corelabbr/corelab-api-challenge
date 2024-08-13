import { ICreateTaskDto } from 'modules/task/dtos/ICreateTaskDto';
import { ResponseTaskDto } from 'modules/task/dtos/ResponseTaskDto';
import { ITaskRepository } from 'modules/task/repositories/ITaskRepository';
import { AppError } from 'shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) {}

  async execute(id: string, data: ICreateTaskDto): Promise<ResponseTaskDto> {
    const task = await this.taskRepository.findById(id);
    if (data.title === task.title && data.taskContent === task.taskContent && task.isFavorite === data.isFavorite) {
      throw new AppError('Mesmo conteudo!', 409);
    }
    if (!task) {
      throw new AppError('Task not found!', 404);
    }
    const toUpdateTask = Object.assign(task, data);

    const updatedTask = await this.taskRepository.update(toUpdateTask);

    return new ResponseTaskDto(updatedTask);
  }
}

export { UpdateTaskService };
