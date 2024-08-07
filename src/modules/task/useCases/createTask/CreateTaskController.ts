import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";

import { container } from "tsyringe";
import { CreateTaskService } from "./CreateTaskService";
import { Request, Response } from "express";

class CreateTaskController {

  async handle(request: Request, response: Response) : Promise<Response> {

    const { title, taskContent }: ICreateTaskDto = request.body;
    const createUserService = container.resolve(CreateTaskService);

    const task = await createUserService.execute({
      title, taskContent
    });

    return response.status(201).send(task);

  }


}

export { CreateTaskController }