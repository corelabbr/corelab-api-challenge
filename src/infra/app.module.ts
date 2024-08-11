import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma/prisma.service';
import { HttpModule } from './http/http.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [PrismaService],
})
export class AppModule {}
