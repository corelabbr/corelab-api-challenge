import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [TodosModule],
  providers: [PrismaService],
})
export class AppModule {}
