import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { env } from "./env"
import { routes } from './routes/routes'
import path from 'path'

const app = express()
const port = env.PORT

app.use(cors())
app.use(helmet())
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json())
app.use(express.static(path.join((process.cwd() + '/public'))))

app.use('/', routes)

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`))
