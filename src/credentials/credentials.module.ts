import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './credential.entity';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
