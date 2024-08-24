import { Router } from 'express'
import searchController from '../controllers/search.controller.js'

import { globalErrorWrapper } from '../utils/globalErrorWrapper.js'

const searchRouter = Router()

searchRouter.get(
  '/person/:query',
  globalErrorWrapper(searchController.searchPerson)
)
searchRouter.get(
  '/movie/:query',
  globalErrorWrapper(searchController.searchMovie)
)
searchRouter.get('/tv/:query', globalErrorWrapper(searchController.searchTv))

searchRouter.get(
  '/history',
  globalErrorWrapper(searchController.getSearchHistory)
)
searchRouter.delete(
  '/history/:id',
  globalErrorWrapper(searchController.removeItemFromSearchHistory)
)

export default searchRouter
