import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  ParseIntPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto, TasksResponseDto } from './dto/task.dto';
import { TaskStatus } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filter by task status',
  })
  @ApiQuery({
    name: 'isFavorite',
    required: false,
    type: Boolean,
    description: 'Filter by favorite status',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search in title and description',
  })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
    type: TasksResponseDto,
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: TaskStatus,
    @Query('isFavorite') isFavorite?: boolean,
    @Query('search') search?: string,
  ): Promise<TasksResponseDto> {
    const { tasks, total, totalPages } = await this.tasksService.findAll(
      page,
      limit,
      status,
      isFavorite,
      search,
    );

    return {
      tasks,
      total,
      limit,
      page,
      totalPages,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get task statistics by status' })
  @ApiResponse({
    status: 200,
    description: 'Task statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        pending: { type: 'number' },
        in_progress: { type: 'number' },
        completed: { type: 'number' },
      },
    },
  })
  async getStats() {
    return await this.tasksService.getTasksByStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TaskResponseDto> {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific task' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific task' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.tasksService.remove(id);
  }

  @Patch(':id/favorite')
  @ApiOperation({ summary: 'Toggle favorite status of a task' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({
    status: 200,
    description: 'Favorite status toggled successfully',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async toggleFavorite(@Param('id', ParseUUIDPipe) id: string): Promise<TaskResponseDto> {
    return await this.tasksService.toggleFavorite(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update task status' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({
    status: 200,
    description: 'Task status updated successfully',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Invalid status' })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: TaskStatus,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateStatus(id, status);
  }
}