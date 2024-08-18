import mongoose from 'mongoose'
import { envConfig } from './envConfig.js'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConfig.MONGODB_URI)
    console.log('MongoDB connected: ', conn.connection.host)
  } catch (error) {
    console.log('Error while connecting to MongoDB:', error.message)
    process.exit(1) // 1 = error, 0 = success
  }
}
