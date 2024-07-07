import express from 'express'
import { celebrate, Segments } from 'celebrate'

import { createNote, editNote, editFavoriteNote, deleteNote } from '../../modules/note/note.service'
import {
  createNoteSchema,
  editNoteSchema,
  editFavoriteNoteSchema,
  deleteNoteSchema
} from '../../modules/note/note.schema'

const router = express.Router()

router
  .post('/createNote', celebrate({ [Segments.BODY]: createNoteSchema }), async (req, res) => {
    try {
      const newNote = await createNote(req.body)
      if (newNote) return res.status(201).send(newNote)

      return res.status(400).json({ message: 'Erro ao criar tarefa' })
    } catch (err) {
      res.status(500).send(err.message)
      next(err)
    }
  })
  .patch('/editNote', celebrate({ [Segments.BODY]: editNoteSchema }), async (req, res) => {
    try {
      const newNote = await editNote(req.body)
      if (newNote) return res.status(200).send(newNote)

      return res.status(400).json({ message: 'Erro ao editar tarefa' })
    } catch (err) {
      res.status(500).send(err.message)
      next(err)
    }
  })
  .patch(
    '/editFavoriteNote',
    celebrate({ [Segments.BODY]: editFavoriteNoteSchema }),
    async (req, res) => {
      try {
        const newNote = await editFavoriteNote(req.body)
        if (newNote) return res.status(200).send(newNote)

        return res.status(400).json({ message: 'Erro ao editar tarefa' })
      } catch (err) {
        res.status(500).send(err.message)
        next(err)
      }
    }
  )
  .delete('/deleteNote', celebrate({ [Segments.BODY]: deleteNoteSchema }), async (req, res) => {
    try {
      const note = await deleteNote(req.body.id)
      if (note) return res.status(200).json({ message: 'Tarefa deletada com sucesso' })

      return res.status(400).json({ message: 'Erro ao deletar tarefa' })
    } catch (err) {
      res.status(500).send(err.message)
      next(err)
    }
  })
export default router
