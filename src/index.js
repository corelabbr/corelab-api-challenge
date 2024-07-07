import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import CreateNote from './controllers/note/index.js'

const MONGO_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Database')
  })
  .catch(error => {
    console.error('Error connecting to database:', error)
  })

const app = express()
const port = process.env.PORT || 4444
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}
app.use(cors(corsConfig))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(CreateNote)

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`))
