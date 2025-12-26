import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create_user.dto';
import { Credential } from 'src/credentials/credential.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(
    userDTO: CreateUserDTO,
  ): Promise<{ user: User; credential: Credential }> {
    const user = new User();
    user.fullName = userDTO.fullName;

    await this.dataSource.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(user);

      const credential = new Credential();
      credential.email = userDTO.email;
      credential.passwordHash = await argon2.hash(userDTO.password);
      credential.credentialableId = user.id;

      await transactionEntityManager.save(credential);
    });

    return { user: user, credential: user.credential };
  }
}
