import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

const validColors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray'];

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Write comprehensive documentation for the new features',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({
    description: 'Task color for UI customization',
    example: 'blue',
    enum: validColors,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(validColors)
  color?: string;

  @ApiProperty({
    description: 'Indicates if the task is marked as favorite',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class TaskResponseDto {
  @ApiProperty({
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Write comprehensive documentation for the new features',
  })
  description?: string;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Task color for UI customization',
    example: '#3B82F6',
  })
  color: string;

  @ApiProperty({
    description: 'Indicates if the task is marked as favorite',
    example: false,
  })
  isFavorite: boolean;

  @ApiProperty({
    description: 'Task creation date',
    example: '2023-12-01T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Task last update date',
    example: '2023-12-01T15:45:00.000Z',
  })
  updatedAt: Date;
}

export class TasksResponseDto {
  @ApiProperty({
    description: 'List of tasks',
    type: [TaskResponseDto],
  })
  tasks: TaskResponseDto[];

  @ApiProperty({
    description: 'Total number of tasks',
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: 'Number of tasks per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 3,
  })
  totalPages: number;
}