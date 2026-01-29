import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTaskByIdService } from "./GetTaskByIdService";


class GetTaskByIdController {

   async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getTaskByIdController = container.resolve( GetTaskByIdService );
    const task = await getTaskByIdController.execute(id);

    
    return response.status(200).send(task);
   }

}

export { GetTaskByIdController }