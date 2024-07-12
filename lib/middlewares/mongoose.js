import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGODB_URI

const databaseMiddleware = async (req, res, next) => {
  try {
    if (!global.mongoose) {
      global.mongoose = await mongoose.connect(MONGO_URI)
    }
    console.log('Connected to Database')
  } catch (error) {
    console.error('Error connecting to database:', error)
  }
}
export default databaseMiddleware
