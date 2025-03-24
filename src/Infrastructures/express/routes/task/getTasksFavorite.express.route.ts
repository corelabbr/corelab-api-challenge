import getTasksFavoriteUsecase from "../../../../usecases/task/getTasksFavorite.usecase";
import { HttpMethod, Route } from "../route";
import { Request, Response } from "express";

export class GetTasksFavoriteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getTaskFavoriteUsecase: getTasksFavoriteUsecase
    ) { }

    public static create(getTaskFavoriteUsecase: getTasksFavoriteUsecase) {
        return new GetTasksFavoriteRoute(
            "/task/star/favorite",
            HttpMethod.GET,
            getTaskFavoriteUsecase
        )
    }

    getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const task = await this.getTaskFavoriteUsecase.execute();
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