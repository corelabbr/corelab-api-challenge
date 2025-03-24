import { TaskEntity } from "../../domains/entities/task.entity";
import { TaskGateway } from "../../domains/gateway/task.gateway";
import { Usecase } from "../usecase";

export type UpdateTaskInput = {
    id: string;
    title: string;
    is_favorite: boolean;
    color: string;
};

export type UpdateTaskOutput = void;

export default class UpdateTaskUsecase implements Usecase<UpdateTaskInput, UpdateTaskOutput> {
    private constructor(private readonly taskGateway: TaskGateway) { }

    static create(taskGateway: TaskGateway): UpdateTaskUsecase {
        return new UpdateTaskUsecase(taskGateway);
    }

    async execute(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
        this.validate(input);
        const task = await this.taskGateway.getTaskById(input.id);
        if (!task) {
            throw new Error('Task not found');
        }

        let updatedTask = TaskEntity.restore({
            id: task.id,
            title: input.title,
            is_favorite: input.is_favorite,
            color: input.color,
        });

        await this.taskGateway.updateTask(updatedTask);
    }

    private validate(input: UpdateTaskInput): void {
        if (!input.id) {
            throw new Error('Id is required');
        }

        if (!input.title) {
            throw new Error('Title is required');
        }

        if (!input.color) {
            throw new Error('Color is required');
        }

        if (input.is_favorite == undefined) {
            throw new Error('Is favorite is required');
        }
    }
}
