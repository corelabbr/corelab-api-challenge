import express, { Express, json } from 'express'
import routes from './config/routes'
import { errorHandler, logError } from './middlewares/errorHandler'
import cors from './config/cors'

class App {
  public app: Express = express()

  constructor() {
    this.app = express()
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupErrorHandler()
  }

  setupMiddlewares() {
    this.app.use(json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors)
  }

  setupErrorHandler() {
    this.app.use(logError, errorHandler)
  }

  setupRoutes() {
    this.app.use(routes)
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`Backend running in port ${port}`))
  }
}

export default new App()
