import { Request, Response } from "express";
import { CreateTodoService } from "../services/CreateTodoService";

export class CreateTodoController {
  async handle(req: Request, res: Response) {
    const { title, description, completed, color, favorite } = req.body;

    const createTodo = new CreateTodoService();

    const newTodo = await createTodo.execute({
      title,
      description,
      completed,
      color,
      favorite,
    });

    return res.json(newTodo);
  }
}
