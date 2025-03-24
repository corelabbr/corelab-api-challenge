import { TaskGateway } from "../../domains/gateway/task.gateway";
import { Usecase } from "../usecase";

export type DeleteTaskInput = {
  id: string;
};

export type DeleteTaskOutput = void;

export default class DeleteTaskUsecase implements Usecase<DeleteTaskInput, DeleteTaskOutput> {
  private constructor(private readonly taskGateway : TaskGateway) { }

  static create(taskGateway : TaskGateway): DeleteTaskUsecase {
    return new DeleteTaskUsecase(taskGateway);
  }

  async execute(input: DeleteTaskInput): Promise<DeleteTaskOutput> {
    this.validate(input);
    const task = await this.taskGateway.getTaskById(input.id);
    if (!task) {
      throw new Error('task not found');
    }

    return await this.taskGateway.deleteTask(input.id);
  }

  private validate(input: DeleteTaskInput): void {
    if (!input.id) {
      throw new Error('id is required');
    }
  }
}