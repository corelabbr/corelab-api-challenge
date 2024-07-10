import express from 'express'
import { celebrate, Segments } from 'celebrate'
import multer from 'multer'
import fs from 'fs'
import { storage } from '../../../multer.config'

import {
  createNote,
  createFavoriteNote,
  editNote,
  editFavoriteNote,
  deleteNote,
  getFavoritesNotes,
  getNotes,
  getOneNote,
  editFile,
  editFileToDelete
} from '../../modules/note/note.service'
import {
  createNoteSchema,
  editNoteSchema,
  editFavoriteNoteSchema,
  deleteNoteSchema
} from '../../modules/note/note.schema'

const router = express.Router()
const upload = multer({ storage: storage })

router
  .post('/createNote', celebrate({ [Segments.BODY]: createNoteSchema }), async (req, res) => {
    try {
      const newNote = await createNote(req.body)
      if (newNote) return res.status(201).send(newNote)

      return res.status(400).json({ message: 'Erro ao criar tarefa' })
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  .post(
    '/createFavoriteNote',
    celebrate({ [Segments.BODY]: createNoteSchema }),
    async (req, res) => {
      try {
        const newNote = await createFavoriteNote(req.body)
        if (newNote) return res.status(201).send(newNote)

        return res.status(400).json({ message: 'Erro ao criar tarefa' })
      } catch (err) {
        res.status(500).send(err.message)
      }
    }
  )

  .get('/getNotes', async (req, res) => {
    try {
      const notes = await getNotes()
      if (notes) return res.status(200).send(notes)

      return res.status(404).json({ message: 'Tarefa não encontrada' })
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  .get('/getFavoritesNotes', async (req, res) => {
    try {
      const notes = await getFavoritesNotes()
      if (notes) return res.status(200).send(notes)

      return res.status(404).json({ message: 'Tarefa não encontrada' })
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  .get('/getOneNote', async (req, res) => {
    try {
      const note = await getOneNote(req.query.id)
      if (note) return res.status(200).send(note)

      return res.status(404).json({ message: 'Tarefa não encontrada' })
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  .patch('/editNote', celebrate({ [Segments.BODY]: editNoteSchema }), async (req, res) => {
    try {
      const newNote = await editNote(req.body)
      if (newNote) return res.status(200).send(newNote)

      return res.status(400).json({ message: 'Erro ao editar tarefa' })
    } catch (err) {
      res.status(500).send(err.message)
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
      }
    }
  )

  .delete('/deleteNote', celebrate({ [Segments.BODY]: deleteNoteSchema }), async (req, res) => {
    try {
      const note = await deleteNote(req.body.id)
      if (note.src !== '') {
        fs.unlinkSync(note.src)
      }
      if (note) return res.status(200).json({ message: 'Tarefa deletada com sucesso' })

      return res.status(400).json({ message: 'Erro ao deletar tarefa' })
    } catch (err) {
      res.status(500).send(err.message)
    }
  })

  .patch('/files/editFile', upload.single('file'), async (req, res) => {
    try {
      const newFile = await editFile(req.body, req.file.path)
      if (newFile) return res.status(200).json(newFile)

      return res.status(400).json({ message: 'Erro ao criar arquivo' })
    } catch (err) {
      res.status(500).json(err.message)
    }
  })

  .patch('/files/editFileToDelete', async (req, res) => {
    try {
      const findSrc = await getOneNote(req.body.id)
      fs.unlinkSync(findSrc.src)
      const file = await editFileToDelete(req.body)

      if (!file) res.status(404).json({ message: 'Arquivo não encontrado' })

      return res.status(200).json({ message: 'Arquivo deletado com suceesso' })
    } catch (err) {
      res.status(500).json(err.message)
    }
  })
export default router
