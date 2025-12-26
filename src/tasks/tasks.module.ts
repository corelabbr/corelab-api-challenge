import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
