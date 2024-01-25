import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './credential.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  async findOne(id: number): Promise<Credential | undefined> {
    return this.credentialsRepository.findOneBy({ id });
  }

  async findCredentialByEmail(email: string): Promise<Credential | undefined> {
    return this.credentialsRepository.findOneBy({ email });
  }
}
