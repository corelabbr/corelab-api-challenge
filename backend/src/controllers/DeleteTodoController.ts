import { Request, Response } from "express";
import { DeleteTodoService } from "../services/DeleteTodoService";

export class DeleteTodoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteTodoService = new DeleteTodoService();

    const deleteTodo = await deleteTodoService.execute(id);

    return res.json(deleteTodo);
  }
}
