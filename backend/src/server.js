import express from 'express'
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import { envConfig } from './config/envConfig.js'
import { connectDB } from './config/db.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()
const PORT = envConfig.PORT

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie', movieRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  // connect DB
  connectDB()
})
