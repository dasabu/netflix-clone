import { Router } from 'express'
import {
  loginController,
  signupController,
  logoutController,
} from '../controllers/auth.controller.js'
import {
  loginMiddleware,
  signupMiddleware,
} from '../middlewares/auth.middleware.js'

import { globalErrorWrapper } from '../utils/globalErrorWrapper.js'

const authRoutes = Router()

authRoutes.post(
  '/signup',
  signupMiddleware,
  globalErrorWrapper(signupController)
)

authRoutes.post('/login', loginMiddleware, globalErrorWrapper(loginController))

authRoutes.post('/logout', globalErrorWrapper(logoutController))

export default authRoutes
