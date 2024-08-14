import { UserEntity } from 'src/user/entities/user.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, UserEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
