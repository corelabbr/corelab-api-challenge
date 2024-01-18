import { disconnectDB, connectDb,loadEnv} from '@/config'
import 'reflect-metadata'
import 'express-async-errors'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import {
  userRouter,
  authenticationRouter,
  taskRouter,
} from '@/routes'
import { handleApplicationErrors } from '@/middlewares'

loadEnv()
const app: Express = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req: Request, res: Response) => res.send('OK!'))

app.use('/users', userRouter)
app.use('/auth', authenticationRouter)
app.use('/task',taskRouter)

app.use(handleApplicationErrors)

export function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB()
}

export default app
