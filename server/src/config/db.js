import mongoose from 'mongoose'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const connectDB = async ({ maxRetries = 5, retryDelayMs = 3000 } = {}) => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      })

      console.log(`MongoDB Connected: ${conn.connection.host}`)
      console.log(`MongoDB Connected: ${conn.connection.name}`)
      return conn
    } catch (error) {
      console.error(`Database connection error (attempt ${attempt}/${maxRetries}):`, error.message)

      if (attempt === maxRetries) {
        throw error
      }

      await sleep(retryDelayMs)
    }
  }
}

export default connectDB