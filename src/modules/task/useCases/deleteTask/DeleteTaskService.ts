import { ITaskRepository } from "modules/task/repositories/ITaskRepository";
import { AppError } from "shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteTaskService {

  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if(!task) throw new AppError('Task not found!', 404);

    await this.taskRepository.delete(task);

  }
}

export { DeleteTaskService }