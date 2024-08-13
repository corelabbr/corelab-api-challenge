import 'dotenv/config'

export default {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  appUrl: process.env.APP_URL,
}
