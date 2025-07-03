import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // Constructor

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Method to find all users

  async findAll() {
    return this.userRepository.find({
      relations: ['listNotes'],
    });
  }

  // Method to find a user

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['listNotes'],
    });
  }

  // Method to find user by e-mail

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  // Methods to create users

  async create(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existing) throw new ConflictException('Este e-mail já foi cadastrado!');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: 'USER',
    });

    return this.userRepository.save(newUser);
  }

  // Methods to create admin users

  async createAdmin(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existing)
      throw new ConflictException('This e-mail is already registered');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: 'ADMIN',
    });

    return this.userRepository.save(newUser);
  }

  // Methods to update users

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Methods to remove user

  async remove(id: string) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
