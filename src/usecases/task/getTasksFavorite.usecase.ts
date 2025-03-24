import { TaskEntity } from "../../domains/entities/task.entity";
import { TaskGateway } from "../../domains/gateway/task.gateway";
import { Usecase } from "../usecase";

export type getTasksFavoriteInputDto = null;

export type getTasksFavoriteOutputDto = {
    id: string,
    title: string,
    is_favorite: boolean,
    color: string,
}[]

export default class GetTasksFavoriteUsecase implements Usecase<getTasksFavoriteInputDto, getTasksFavoriteOutputDto> {
    private constructor(private readonly taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway): GetTasksFavoriteUsecase {
        return new GetTasksFavoriteUsecase(taskGateway);
    }

    public async execute(): Promise<getTasksFavoriteOutputDto> {
        const tasks = await this.taskGateway.getTasksFavorite();
        return this.mapToOutput(tasks);
    }

    private mapToOutput(tasks: TaskEntity[]): getTasksFavoriteOutputDto {
        return tasks.map((task) => {
            return {
                id: task.id,
                title: task.title,
                is_favorite: task.is_favorite,
                color: task.color,
            };
        });
    }
}