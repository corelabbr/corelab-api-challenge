import { Request, Response } from "express";
import { GetTodosService } from "../services/GetTodosService";

export class GetTodosController {
  async handle(req: Request, res: Response) {
    const getTodos = new GetTodosService();

    const todos = await getTodos.execute();

    return res.json(todos);
  }
}
