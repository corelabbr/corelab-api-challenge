import app from './app'
import env from './env'

const port = env.port || 3001

app.listen(port)
