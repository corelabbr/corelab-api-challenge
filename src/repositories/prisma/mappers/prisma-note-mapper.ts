import { note as PrismaNote } from '@prisma/client'
import { Note } from '../../../entities/note'

export class PrismaNoteMapper {
  static toPrisma(note: Note): PrismaNote {
    return {
      title: note.title,
      description: note.description,
      color: note.color,
      isFavorite: note.isFavorite,
      id: note.id!,
    }
  }

  static toEntity(note: PrismaNote): Note {
    return new Note(
      {
        color: note.color!,
        isFavorite: note.isFavorite!,
        description: note.description,
        title: note.title,
      },
      note.id,
    )
  }
}
