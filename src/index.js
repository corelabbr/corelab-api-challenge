import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import databaseMiddleware from '../lib/middlewares/mongoose.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
databaseMiddleware()

import RoutesNote from './controllers/note/index.js'

const app = express()
const port = process.env.PORT
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

app.use(RoutesNote)
app.use('/seeFile', express.static('uploads'))

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`))
