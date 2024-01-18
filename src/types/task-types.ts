
import { Prisma } from '@prisma/client';

export type TaskData = {
  title: string;
  description: string;
  favorite?: boolean;
  color?: string;
};

export type TaskCreateInput = Prisma.TaskCreateInput;

