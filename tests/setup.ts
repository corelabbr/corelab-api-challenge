import mongoose from 'mongoose'
import { env } from '../src/configs/env'

beforeAll(async () => {
  await mongoose.connect(env.MONGODB_URI)
})

afterAll(async () => {
  await mongoose.connection.close()
})
