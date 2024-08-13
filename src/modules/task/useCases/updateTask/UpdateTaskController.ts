import { Request, Response } from "express";
import { container} from "tsyringe";
import { UpdateTaskService } from "./UpdateTaskService";
import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";

class UpdateTaskController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {title, taskContent, isFavorite}: ICreateTaskDto = request.body;

    const updateTaskService = container.resolve( UpdateTaskService );
    const task = await updateTaskService.execute(id, {title, taskContent, isFavorite});

    
    return response.status(200).send(task);
   }
}

export { UpdateTaskController }