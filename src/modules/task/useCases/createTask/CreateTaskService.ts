


import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../repositories/ITaskRepository";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { ResponseTaskDto } from "../../dtos/ResponseTaskDto";
import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";

@injectable()
class CreateTaskService{
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ){}

  async execute(data: ICreateTaskDto):Promise<ResponseTaskDto>{
 
    const task = await this.taskRepository.save(data)
  
    return new ResponseTaskDto(task);
  }

}
export{CreateTaskService}
