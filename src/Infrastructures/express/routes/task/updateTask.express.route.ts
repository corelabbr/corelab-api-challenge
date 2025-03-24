
import UpdateTaskUsecase from "../../../../usecases/task/updateTask.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class UpdateTaskRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTaskUsecase: UpdateTaskUsecase
    ) { }

    public static create(updateTaskUsecase: UpdateTaskUsecase) {
        return new UpdateTaskRoute(
            "/task",
            HttpMethod.PUT,
            updateTaskUsecase
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { id, title, is_favorite, color } = req.body;
            const task = await this.updateTaskUsecase.execute({
                id,
                title,
                is_favorite,
                color
            });
            res.status(200).json({ message: "Task updated" });
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