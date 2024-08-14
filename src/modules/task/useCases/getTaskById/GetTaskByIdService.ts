import { ResponseTaskDto } from "modules/task/dtos/ResponseTaskDto";
import { ITaskRepository } from "modules/task/repositories/ITaskRepository";
import { AppError } from "shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class GetTaskByIdService {

  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) {}

  async execute(id: string): Promise<ResponseTaskDto> {
    const task = await this.taskRepository.findById(id);
    if(!task) throw new AppError('Task has not found!', 404);

    return new ResponseTaskDto(task)
  }
}

export { GetTaskByIdService }