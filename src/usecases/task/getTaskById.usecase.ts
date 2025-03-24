import { TaskEntity } from "../../domains/entities/task.entity";
import { TaskGateway } from "../../domains/gateway/task.gateway";
import { Usecase } from "../usecase";

export type GetTaskByIdInputDto = {
    id: string;
}

export type GetTaskByIdOutputDto = {
    id: string;
    title: string;
    is_favorite: boolean;
    color: string;
}

export default class GetTaskByIdUsecase implements Usecase<GetTaskByIdInputDto, GetTaskByIdOutputDto> {
    private constructor(private readonly taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway): GetTaskByIdUsecase {
        return new GetTaskByIdUsecase(taskGateway);
    }

    async execute(input: GetTaskByIdInputDto): Promise<GetTaskByIdOutputDto> {
        this.validate(input);

        const task = await this.taskGateway.getTaskById(input.id);
        if (!task) {
            throw new Error('Task not found');
        }

        return this.mapToOutput(task);
    }

    private validate(input: GetTaskByIdInputDto): void {
        if (!input.id) {
            throw new Error('Id is required');
        }
    }

    private mapToOutput(task: TaskEntity): GetTaskByIdOutputDto {
        return {
            id: task.id,
            title: task.title,
            is_favorite: task.is_favorite,
            color: task.color
        };
    }
}
