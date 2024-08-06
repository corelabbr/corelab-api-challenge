import mongoose from 'mongoose'
import server from './configs/server'

mongoose
  .connect('mongodb://localhost:27017/corelab')
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen(8080, () => {
      console.log('Server is running at: http://localhost:8080')
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error)
  })
