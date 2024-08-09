import mongoose from 'mongoose'
import { env } from './configs/env'
import server from './configs/server'

mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen(env.PORT, () => {
      console.log(`Server is running at: http://localhost:${env.PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error)
  })
