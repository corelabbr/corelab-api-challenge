import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../repositories/ITaskRepository";
import { ResponseTaskDto } from "../../dtos/ResponseTaskDto";
import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";
import { AppError } from "shared/infra/http/errors/AppError";
import { hasEmptyValues } from "utils/util";

@injectable()
class CreateTaskService{
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ){}

  async execute(data: ICreateTaskDto):Promise<ResponseTaskDto>{
    if(hasEmptyValues(data)) throw new AppError("Task must have title and content!", 400)
    const task = await this.taskRepository.save(data)
  
    return new ResponseTaskDto(task);
  }

}
export{CreateTaskService}
