import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { routes } from '../app/routes/index.routes'
import { swaggerSpec } from './swaggerConfig'

export class HttpServer {
  private _app: express.Express

  constructor() {
    this._app = express()
    this.setup()
  }

  private setup() {
    this._app.use(cors({
      origin: [
        'http://localhost:5501',
        'http://localhost:3306',
        'http://localhost:3001',
        'http://127.0.0.1:5501',
        'http://127.0.0.1:3306',
        'http://127.0.0.1:3001',
      ]
    }))

    this._app.use(morgan('[:date[clf]] ":method :url" :status :res[content-length]'))

    this._app.use(helmet())
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))

    this._app.use(routes)

    this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  public get app() {
    return this._app
  }
}