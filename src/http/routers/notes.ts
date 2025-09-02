import z from 'zod'
import { FastifyTypedInstance } from '../../types/fastify'
import { CreateNoteController } from '../controllers/create-note-controller'
import { DeleteNoteController } from '../controllers/delete-note-controller'
import { GetNotesController } from '../controllers/get-notes-controller'
import { UpdateNoteController } from '../controllers/update-note-controller'
import { PatchNoteController } from '../controllers/patch-note-controller'

const getNotesController = new GetNotesController()
const createNoteController = new CreateNoteController()
const updateNoteController = new UpdateNoteController()
const patchNoteController = new PatchNoteController()
const deleteNoteController = new DeleteNoteController()

export function NotesRoutes(app: FastifyTypedInstance) {
  app.get(
    '/notes',
    {
      schema: {
        tags: ['notes'],
        description: 'Get all note',
        querystring: z.object({
          search: z.string().default(''),
        }),
        response: {
          200: z.object({
            notes: z
              .object({
                title: z.string().min(1),
                description: z.string().min(1),
                isFavorite: z.boolean(),
                color: z.string(),
                id: z.number(),
              })
              .array(),
          }),
        },
      },
    },
    getNotesController.handle,
  )

  app.post(
    '/notes',
    {
      schema: {
        tags: ['notes'],
        description: 'Create a new note',
        body: z.object({
          title: z.string().min(1),
          description: z.string().min(1),
          isFavorite: z.boolean(),
          color: z.string(),
        }),
        response: {
          201: z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            isFavorite: z.boolean(),
            color: z.string(),
            id: z.number(),
          }),

          400: z.object({
            statusCode: z.number(),
            code: z.string(),
            error: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    createNoteController.handle,
  )

  app.put(
    '/notes/:id',
    {
      schema: {
        tags: ['notes'],
        description: 'Update a note',
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          title: z.string().min(1),
          description: z.string().min(1),
          isFavorite: z.boolean(),
          color: z.string(),
        }),
        response: {
          200: z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            isFavorite: z.boolean(),
            color: z.string(),
            id: z.number(),
          }),
          404: z.object({
            message: z.string(),
            status: z.string(),
            code: z.number(),
          }),
        },
      },
    },
    updateNoteController.handle,
  )

  app.patch(
    '/notes/:id',
    {
      schema: {
        tags: ['notes'],
        description: 'partial update a note',
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          title: z.string().min(1).optional(),
          description: z.string().min(1).optional(),
          isFavorite: z.boolean().optional(),
          color: z.string().optional(),
        }),
        response: {
          200: z.object({
            title: z.string(),
            description: z.string(),
            isFavorite: z.boolean(),
            color: z.string(),
            id: z.number(),
          }),
          404: z.object({
            message: z.string(),
            status: z.string(),
            code: z.number(),
          }),
        },
      },
    },
    patchNoteController.handle,
  )

  app.delete(
    '/notes/:id',
    {
      schema: {
        tags: ['notes'],
        description: 'Delete a note',
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          204: z.null().describe('Note deleted'),
        },
      },
    },
    deleteNoteController.handle,
  )
}
