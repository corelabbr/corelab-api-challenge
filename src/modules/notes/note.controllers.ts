import { Request, Response } from 'express'
import { env } from '../../configs/env'
import { AppError } from '../../errors/AppError'
import { NoteMongoRepository } from './adapters/mongo/note.mongo.repository'
import { NoteServices } from './domain/note.services'
import {
  createNoteBodySchema,
  noteIdParamSchema,
  updateNoteBodySchema,
} from './zod.schemas'

const noteRepository = new NoteMongoRepository()
const noteServices = new NoteServices(noteRepository)

export const noteController = {
  async create(req: Request, res: Response) {
    const createNoteDTO = createNoteBodySchema.parse(req.body)
    const note = await noteServices.createNote(createNoteDTO)

    return res.status(201).json(note)
  },

  async update(req: Request, res: Response) {
    const updateNoteDTO = updateNoteBodySchema.parse(req.body)
    const id = noteIdParamSchema.parse(req.params.id).toString()

    const note = await noteServices.updateNote({
      ...updateNoteDTO,
      id,
    })

    return res.status(200).json(note)
  },

  async delete(req: Request, res: Response) {
    const id = noteIdParamSchema.parse(req.params.id).toString()

    await noteServices.deleteNote(id)

    return res.status(204).send()
  },

  async findById(req: Request, res: Response) {
    const id = noteIdParamSchema.parse(req.params.id).toString()

    const note = await noteServices.getNoteById(id)

    return res.status(200).json(note)
  },

  async findAll(req: Request, res: Response) {
    const notes = await noteServices.getAllNotes()
    return res.status(200).json(notes)
  },

  async findFavorites(req: Request, res: Response) {
    const notes = await noteServices.getFavoritesNotes()

    return res.status(200).json(notes)
  },

  async addFile(req: Request, res: Response) {
    if (!req.file) {
      throw AppError.badRequest('File is required')
    }

    const id = noteIdParamSchema.parse(req.params.id).toString()

    const fileUrl = `http://localhost:${env.PORT}/static/${req.file.filename}`
    const response = await noteServices.updateNote({ id, fileUrl })

    return res.status(200).json(response)
  },
}
