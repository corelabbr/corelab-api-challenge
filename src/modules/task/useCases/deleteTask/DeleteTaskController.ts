import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTaskService } from "./DeleteTaskService";

class DeleteTaskController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTaskController = container.resolve( DeleteTaskService );
    await deleteTaskController.execute(id);

    return response.status(200).send("Task deleted.");
   }
}

export { DeleteTaskController }