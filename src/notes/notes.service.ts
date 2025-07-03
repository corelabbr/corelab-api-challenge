import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  // Constructor
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Method to find all notes

  async findAll() {
    const notes = await this.noteRepository.find({
      relations: ['user'],
    });
    return notes.map((note) => {
      const { user, ...rest } = note;
      return {
        ...rest,
        userId: user.id,
      };
    });
  }

  // Method to find a note

  async findOne(id: string) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!note) throw new NotFoundException(`Note ${id} not found`);
    const { user, ...rest } = note;
    return {
      ...rest,
      userId: user.id,
    };
  }

  // Method to create a note

  async create(createNoteDto: CreateNoteDto) {
    const user = await this.userRepository.findOneBy({
      id: createNoteDto.userId,
    });
    if (!user)
      throw new NotFoundException(`User ${createNoteDto.userId} not found`);

    const note = this.noteRepository.create({
      title: createNoteDto.title,
      body: createNoteDto.body,
      color: createNoteDto.color,
      isFavorite: createNoteDto.isFavorite ?? false,
      user,
    });

    return this.noteRepository.save(note);
  }

  // Method to update a note

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.noteRepository.update(id, updateNoteDto);
    return this.findOne(id);
  }

  // Method to update the prop color from note

  async updateColor(id: string, color: string) {
    await this.noteRepository.update(id, { color });
    return this.findOne(id);
  }

  // Method to update the prop isFavorite from note

  async updateFavorite(id: string, isFavorite: boolean) {
    await this.noteRepository.update(id, { isFavorite });
    return this.findOne(id);
  }

  // Method to remove a note

  async remove(id: string) {
    await this.noteRepository.delete(id);
    return { deleted: true };
  }
}
