
import { CreateTaskUsecase } from "../../../../usecases/task/createTask.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class CreateTaskRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTaskUsecase: CreateTaskUsecase
    ) { }

    public static create(createTaskUsecase: CreateTaskUsecase) {
        return new CreateTaskRoute(
            "/task",
            HttpMethod.POST,
            createTaskUsecase
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { title, is_favorite, color } = req.body;
            const task = await this.createTaskUsecase.execute({
                title,
                is_favorite,
                color
            });
            res.status(201).json({
                message: "Task created",
                id: task.id
            });
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public isProtected(): boolean {
        return false;
    }
}