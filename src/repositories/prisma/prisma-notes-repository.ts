import { Note } from '../../entities/note'
import { prisma } from '../../lib/prisma'
import { GetNotesRepository, NotesRepository } from '../notes-repository'
import { PrismaNoteMapper } from './mappers/prisma-note-mapper'

export class PrismaNotesRepository implements NotesRepository {
  async create(noteRaw: Note): Promise<Note> {
    const note = await prisma.note.create({
      data: {
        color: noteRaw.color,
        isFavorite: noteRaw.isFavorite,
        description: noteRaw.description,
        title: noteRaw.title,
      },
    })

    return PrismaNoteMapper.toEntity(note)
  }

  async get({ search }: GetNotesRepository): Promise<Note[]> {
    const filteredNotes = await prisma.note.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    })

    return filteredNotes.map(PrismaNoteMapper.toEntity)
  }

  async findById(noteId: number): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    })

    if (!note) return null

    return PrismaNoteMapper.toEntity(note)
  }

  async save(noteRaw: Note): Promise<Note> {
    const note = await prisma.note.update({
      data: {
        description: noteRaw.description,
        title: noteRaw.title,
        color: noteRaw.color,
        isFavorite: noteRaw.isFavorite,
      },
      where: {
        id: noteRaw.id,
      },
    })

    return PrismaNoteMapper.toEntity(note)
  }

  async delete(noteId: number): Promise<void> {
    await prisma.note.delete({
      where: { id: noteId },
    })
  }
}
