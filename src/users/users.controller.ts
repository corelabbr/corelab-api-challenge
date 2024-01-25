import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create_user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  index() {
    return this.usersService.findAll();
  }

  @Public()
  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Get(':id')
  findOneAuthor(@Param('id') userId: number) {
    return this.usersService.findOne(userId);
  }
}
