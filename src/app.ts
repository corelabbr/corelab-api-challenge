import fastify, { FastifyInstance } from 'fastify'
import taskRoute from './routes/task-routes'
import cors from '@fastify/cors'
import * as dotenv from 'dotenv'

dotenv.config();
const PORT: number = Number(process.env.PORT)
const ADDRESS: string = process.env.ADDRESS;

class App {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({
      logger: true,
    })
  }

  public async main(): Promise<void> {
    this._useMiddlewares()
    this._useRoutes()
    this._listen()
  }

  private _useMiddlewares() {
    this.app.register(cors, {
      origin: '*',
    })
  }

  private _useRoutes() {
    this.app.register(taskRoute, {
      prefix: '/v1/task/',
    })
  }

  private _listen() {
    this.app.listen({ port: PORT, host: ADDRESS }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  }
}

export default App
