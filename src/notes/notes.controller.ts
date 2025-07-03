import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles('USER', 'ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Roles('USER', 'ADMIN')
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.service.create(createNoteDto);
  }

  @Roles('USER', 'ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.service.update(id, updateNoteDto);
  }

  @Roles('USER', 'ADMIN')
  @Patch(':id/color')
  updateColor(@Param('id') id: string, @Body('color') color: string) {
    return this.service.updateColor(id, color);
  }

  @Roles('USER', 'ADMIN')
  @Patch(':id/favorite')
  updateFavorite(
    @Param('id') id: string,
    @Body('isFavorite') isFavorite: boolean,
  ) {
    return this.service.updateFavorite(id, isFavorite);
  }

  @Roles('USER', 'ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
