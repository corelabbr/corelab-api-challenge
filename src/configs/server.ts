import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { errorHandler } from '../middlewares/handlerErrors'
import { routes } from './routes'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(routes)
server.use('/static', express.static('uploads'))
server.use(errorHandler)

export default server
