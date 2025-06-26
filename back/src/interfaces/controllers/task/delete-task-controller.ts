import { Request, Response } from 'express';
import { DeleteTaskUseCase } from '@usecases/task/delete-task-use-case';

export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const taskId = Number(req.params.id);

      if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
      }

      await this.deleteTaskUseCase.execute(taskId);

      return res.status(200).json({ success: 'Task deleted' });

    } catch (error: any) {
      return res.status(500).json({ error: `Error deleting task: ${error.message}` });
    }
  }
}
