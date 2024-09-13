import { Router } from 'express'

import tvController from '../controllers/tv.controller.js'
import { globalErrorWrapper } from '../utils/globalErrorWrapper.js'

const tvRouter = Router()

tvRouter.get('/trending', globalErrorWrapper(tvController.getTrendingTv))
tvRouter.get('/:id/trailers', globalErrorWrapper(tvController.getTvTrailers))
tvRouter.get('/:id/details', globalErrorWrapper(tvController.getTvDetails))
tvRouter.get('/:id/similar', globalErrorWrapper(tvController.getSimilarTVs))
tvRouter.get('/:category', globalErrorWrapper(tvController.getTvsByCategory))

export default tvRouter
