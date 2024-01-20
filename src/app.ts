import fastify, { FastifyInstance } from 'fastify'
import taskRoute from './routes/task-routes'

const PORT: number = 8080

class App {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({
      logger: true,
    })
  }

  public async main(): Promise<void> {
    this._useRoutes()
    this._listen()
  }

  private _useRoutes() {
    this.app.register(taskRoute, {
      prefix: '/v1/task/',
    })
  }

  private _listen() {
    this.app.listen({ port: PORT }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  }
}

export default App
