import express from 'express'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'

import { envConfig } from './config/env.config.js'
import { connectDB } from './config/db.config.js'
import { errorHandler } from './middlewares/error.middleware.js'
import authMiddleware from './middlewares/auth.middleware.js'

const app = express()
const PORT = envConfig.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie', authMiddleware.authCheck, movieRoutes)
app.use('/api/v1/tv', authMiddleware.authCheck, tvRoutes)
app.use('/api/v1/search', authMiddleware.authCheck, searchRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  // connect DB
  connectDB()
})
