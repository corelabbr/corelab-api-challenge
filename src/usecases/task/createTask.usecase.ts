import { TaskEntity } from "../../domains/entities/task.entity";
import { TaskGateway } from "../../domains/gateway/task.gateway";
import { Usecase } from "../usecase";

export type CreateTaskInputDto = {
    title: string;
    is_favorite: boolean;
    color: string;
}

export type CreateTaskOutputDto = {
    id: string;
    title: string;
    is_favorite: boolean;
    color: string;
};

export class CreateTaskUsecase implements Usecase<CreateTaskInputDto, CreateTaskOutputDto> {
    private constructor(private readonly taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway): CreateTaskUsecase {
        return new CreateTaskUsecase(taskGateway);
    }

    public async execute(input: CreateTaskInputDto): Promise<CreateTaskOutputDto> {
        this.validate(input);

        const task = TaskEntity.create(
            input.title,
            input.is_favorite,
            input.color
        );

        await this.taskGateway.createTask(task);
        return this.mapToOutput(task);
    }

    private validate(input: CreateTaskInputDto): void {
        if (!input.title) {
            throw new Error('Title is required');
        }

        if (!input.color) {
            throw new Error('Color is required');
        }

        if (input.is_favorite == undefined) {
            throw new Error('is_favorite is required');
        }
    }

    private mapToOutput(task: TaskEntity): CreateTaskOutputDto {
        return {
            id: task.id,
            title: task.title,
            is_favorite: task.is_favorite,
            color: task.color
        };
    }
}