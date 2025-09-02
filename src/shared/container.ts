import { container } from 'tsyringe'
import { NotesRepository } from '../repositories/notes-repository'
import { PrismaNotesRepository } from '../repositories/prisma/prisma-notes-repository'

container.registerSingleton<NotesRepository>(
  'NotesRepository',
  PrismaNotesRepository,
)
