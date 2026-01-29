import { IFilterSearchDto } from "modules/task/dtos/IFilterSearchDto";
import { ResponseTaskDto } from "modules/task/dtos/ResponseTaskDto";
import { ITaskRepository } from "modules/task/repositories/ITaskRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetTasksService {

  
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ){}

  async execute(filter?: IFilterSearchDto): Promise<ResponseTaskDto[]|null|undefined> {

    const tasks = await this.taskRepository.findAll(filter);

    const tasksToSend = tasks?.map((task) => {
      return new ResponseTaskDto(task)
    });

    return tasksToSend;
  }
}

export { GetTasksService };