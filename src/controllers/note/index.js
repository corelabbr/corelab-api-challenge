import express from 'express'
import { celebrate, Segments } from 'celebrate'

import { createNote } from '../../modules/note/note.service'
import { createNoteSchema } from '../../modules/note/note.schema'

const router = express.Router()

router.post('/createNote', celebrate({ [Segments.BODY]: createNoteSchema }), async (req, res) => {
  try {
    const newNote = await createNote(req.body)
    if (newNote) return res.status(201).send(newNote)

    return res.status(400).send('erro ao criar tarefa')
  } catch (err) {
    res.status(500).send(err.message)
    next(err)
  }
})
export default router
