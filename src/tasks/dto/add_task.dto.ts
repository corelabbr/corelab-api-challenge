import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddTaskDTO {
  @IsNotEmpty()
  taskTitle: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  color: string;
}
