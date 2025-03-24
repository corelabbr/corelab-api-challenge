
import GetTaskByIdUsecase from "../../../../usecases/task/getTaskById.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetTaskByIdRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getTaskById: GetTaskByIdUsecase
    ) { }

    public static create(getTaskById: GetTaskByIdUsecase) {
        return new GetTaskByIdRoute(
            "/task/:id",
            HttpMethod.GET,
            getTaskById
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const task = await this.getTaskById.execute({
                id
            });
            if (task) {
                res.status(200).send(task);
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