
import { Prisma,Task } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';

export type TaskData = {
  title: string;
  description: string;
  favorite?: boolean;
  color?: string;
};

export interface CreateTaskParams {
  req: AuthenticatedRequest;
  title: string;
  description: string;
  favorite?: boolean;
  color?: string;
}

export interface DeleteTaskParams {
  req: AuthenticatedRequest;
  taskId: string;
}

export interface UpdateTaskParams {
  req: AuthenticatedRequest;
  taskId: number;
  title?: string;
  description?: string;
  favorite?: boolean;
  color?: string;
}

export interface TaskServiceTypes {
  createTaskService(params: CreateTaskParams): Promise<Task>;
  findAllTaskByUserIdService(req: AuthenticatedRequest): Promise<Task[]>;
  deleteTaskService(params: DeleteTaskParams): Promise<void>;
}

export type TaskCreateInput = Prisma.TaskCreateInput;

