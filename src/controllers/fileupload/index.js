import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { storage } from '../../../multer.config'

import { createFile, getFiles, deleteFile } from '../../modules/fileupload/file.service'

const upload = multer({ storage: storage })
const router = express.Router()

router
  .post('/upload', upload.single('file'), async (req, res) => {
    try {
      const newFile = await createFile(req.body, req.file.path)
      await newFile.save()
      if (newFile) return res.status(201).json(newFile)

      return res.status(400).json({ message: 'Erro ao criar arquivo' })
    } catch (err) {
      res.status(500).json(err.message)
    }
  })
  .get('/getFiles', async (req, res) => {
    try {
      const files = await getFiles()
      if (files) return res.status(200).json(files)

      return res.status(404).json({ message: 'Arquivo não encontrado' })
    } catch (err) {
      res.status(500).json(err.message)
    }
  })
  .delete('/deleteFile', async (req, res) => {
    try {
      const file = await deleteFile(req.body.id)
      if (!file) res.status(404).json({ message: 'Arquivo não encontrado' })

      fs.unlinkSync(file.src)

      return res.status(200).json({ message: 'Arquivo deletado com suceesso' })
    } catch (err) {
      res.status(500).json(err.message)
    }
  })
export default router
