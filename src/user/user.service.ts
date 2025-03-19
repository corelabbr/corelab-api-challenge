import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user) {
      const matchPassport = await argon2.verify(user.password, password);
      if (matchPassport) {
        return user;
      }
    } else {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    const existedUser = await this.userRepository.findOne({
      where: { username: username },
    });

    if (existedUser) {
      throw new HttpException('User already existed', HttpStatus.BAD_REQUEST);
    }
    let newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.tasks = [];
    try {
      newUser = await this.userRepository.save(newUser);
      const result = {
        userId: newUser.id,
        username: newUser.username,
      };
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      await this.userRepository.remove(user);
      return {
        message: 'User deleted',
      };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      user.username = updateUserDto.username;
      user.email = updateUserDto.email;
      await this.userRepository.save(user);

      return { message: 'User updated' };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
  }
}
