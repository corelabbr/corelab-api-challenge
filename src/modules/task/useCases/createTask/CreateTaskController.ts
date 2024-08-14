import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";

import { container } from "tsyringe";
import { CreateTaskService } from "./CreateTaskService";
import { Request, Response } from "express";

class CreateTaskController {

  async handle(request: Request, response: Response) : Promise<Response> {
    const { title, taskContent, isFavorite }: ICreateTaskDto = request.body;
    
    const createTaskService = container.resolve(CreateTaskService);

    const task = await createTaskService.execute({
      title, taskContent, isFavorite
    });

    return response.status(201).send(task);

  }


}

export { CreateTaskController }