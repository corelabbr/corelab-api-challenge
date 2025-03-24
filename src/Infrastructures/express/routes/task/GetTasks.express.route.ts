
import GetTasksUsecase from "../../../../usecases/task/getTasks.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetTasksRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getTasksUsecase: GetTasksUsecase
    ) { }

    public static create(getTasksUsecase: GetTasksUsecase) {
        return new GetTasksRoute(
            "/task/",
            HttpMethod.GET,
            getTasksUsecase
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const task = await this.getTasksUsecase.execute();
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