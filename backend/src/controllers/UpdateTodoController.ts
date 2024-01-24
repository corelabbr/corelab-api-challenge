import { Request, Response } from "express";
import { UpdateTodoService } from "../services/UpdateTodoService";

export class UpdateTodoController {
  async handle(req: Request, res: Response) {
    const { id, title, description, completed, color, favorite } = req.body;

    const updateTodoService = new UpdateTodoService();

    const updateTodo = await updateTodoService.execute({
      id,
      title,
      description,
      completed,
      color,
      favorite,
    });

    return res.json(updateTodo);
  }
}
