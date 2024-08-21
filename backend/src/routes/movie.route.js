import { Router } from 'express'
import movieController from '../controllers/movie.controller.js'

import { globalErrorWrapper } from '../utils/globalErrorWrapper.js'

const movieRouter = Router()

movieRouter.get(
  '/trending',
  globalErrorWrapper(movieController.getTrendingMovie)
)
movieRouter.get(
  '/:id/trailers',
  globalErrorWrapper(movieController.getMovieTrailers)
)
movieRouter.get(
  '/:id/details',
  globalErrorWrapper(movieController.getMovieDetails)
)
movieRouter.get(
  '/:id/similar',
  globalErrorWrapper(movieController.getSimilarMovies)
)
movieRouter.get('/:category', movieController.getMoviesByCategory)

export default movieRouter
