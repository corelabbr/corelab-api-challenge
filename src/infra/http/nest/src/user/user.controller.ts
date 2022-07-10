import { CreateUserUseCase } from '@application/user/create/create.usecase';
import { FindOneUserUseCase } from '@application/user/find-one/findOne.usecase';
import { User } from '@domain/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { GetUser } from '../custom/decorators/user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = this.createUserUseCase.execute(createUserDto);
      return userCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.findOneUserUseCase.findById(+id);
  }
}
