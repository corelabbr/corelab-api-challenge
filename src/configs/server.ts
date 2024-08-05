import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { errorHandler } from '../middlewares/handlerErrors'

const server = express()

server.use(express.json())
server.use(cors())
server.use(errorHandler)

export default server
