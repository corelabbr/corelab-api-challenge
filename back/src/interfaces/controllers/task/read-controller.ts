import { Request, Response } from 'express';
import { PrismaTaskRepository } from "@infrastructure/repositories/task-repositories";
import { ReadAllTaskUseCase } from "@usecases/task/read-all-use-case";


export class ReadAllTaskController {
    constructor(
        private readonly readAllTaskUseCase: ReadAllTaskUseCase
    ) {}

    async getAllTasks(req: Request, res: Response): Promise<Response> {
        
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const tasks = await this.readAllTaskUseCase.execute(userId);
            return res.status(200).json(tasks);
        } catch (error: any) {
            return res.status(500).json({ message: "Error fetching tasks", error: error.message });
        }
    }
}