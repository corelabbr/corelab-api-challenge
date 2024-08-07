


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
    const {title, taskContent} = data;
    const taskAlreadyExists = await this.taskRepository.findByTitle(title);
    if(taskAlreadyExists) throw new AppError('Task already exist!', 409)
    const task = await this.taskRepository.save({title, taskContent})
    return new ResponseTaskDto(task);
  }

}
export{CreateTaskService}
