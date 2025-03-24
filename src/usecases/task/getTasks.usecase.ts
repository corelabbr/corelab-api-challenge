import { TaskGateway } from "../../domains/gateway/task.gateway";
import { Usecase } from "../usecase";
import { TaskEntity } from "../../domains/entities/task.entity"; // Adjust the path as needed

export type getTasksOutput = {
    id: string;
    title: string;
    is_favorite: boolean;
    color: string;
}[];

export default class GetTasksUsecase implements Usecase<null, getTasksOutput> {
    private constructor(private readonly taskGateway: TaskGateway) { }

    public static create(taskGateway: TaskGateway): GetTasksUsecase {
        return new GetTasksUsecase(taskGateway);
    }

    public async execute(): Promise<getTasksOutput> {
        const tasks = await this.taskGateway.getTasks();
        return this.mapToOutput(tasks);
    }

    private mapToOutput(tasks: TaskEntity[]): getTasksOutput {
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