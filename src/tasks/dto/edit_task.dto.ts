import { IsOptional } from 'class-validator';

export class EditTaskDTO {
  @IsOptional()
  taskTitle: string;

  @IsOptional()
  description: string;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  color: string;
}
