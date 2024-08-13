import { CorsOptions } from 'cors'
import env from '../env'
import cors from 'cors'

const config: CorsOptions = {
  origin: env.appUrl,
}

export default cors(config)
