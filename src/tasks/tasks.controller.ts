import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { EditTaskDTO, AddTaskDTO } from './dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  addTask(@Body() addTaskDTO: AddTaskDTO, @Request() req: any) {
    const { currentUser } = req;
    return this.tasksService.create(addTaskDTO, currentUser.id);
  }

  @Get('list')
  listUserTasks(@Request() req: any) {
    const { currentUser } = req;
    return this.tasksService.findUserTasks(currentUser.id);
  }

  @Get('favorites')
  listFavorites(@Request() req: any) {
    const { currentUser } = req;
    return this.tasksService.findAllFavorites(currentUser.id);
  }

  @Get(':id')
  findOne(@Param('id') taskId: number) {
    return this.tasksService.findOne(taskId);
  }

  @Patch('edit/:id')
  updateTask(@Param('id') taskId: number, @Body() editTaskDTO: EditTaskDTO) {
    return this.tasksService.update(taskId, editTaskDTO);
  }

  @Patch('complete/:id')
  handleComplete(@Param('id') taskId: number) {
    return this.tasksService.complete(taskId);
  }

  @Patch('favorite/:id')
  favorite(@Param('id') taskId: number) {
    return this.tasksService.favorite(taskId);
  }

  @Delete(':id')
  removeTask(@Param('id') taskId: number) {
    return this.tasksService.remove(taskId);
  }
}
