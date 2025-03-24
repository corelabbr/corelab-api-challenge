
import DeleteTaskUsecase from "../../../../usecases/task/deleteTask.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class DeleteTaskRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteTaskUsecase: DeleteTaskUsecase
    ) { }

    public static create(deleteTaskUsecase: DeleteTaskUsecase) {
        return new DeleteTaskRoute(
            "/task/:id",
            HttpMethod.DELETE,
            deleteTaskUsecase
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const task = await this.deleteTaskUsecase.execute({
                id
            });
            if (task != null) {
                res.status(200).send({ message: "Task deleted" });
            }
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