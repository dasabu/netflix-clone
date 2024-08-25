import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

import { globalErrorWrapper } from '../utils/globalErrorWrapper.js'

const authRouter = Router()

authRouter.post(
  '/signup',
  authMiddleware.signup,
  globalErrorWrapper(authController.signup)
)

authRouter.post(
  '/login',
  authMiddleware.login,
  globalErrorWrapper(authController.login)
)

authRouter.post('/logout', globalErrorWrapper(authController.logout))

authRouter.get(
  '/auth-check',
  authMiddleware.authCheck,
  globalErrorWrapper(authController.authCheck)
)

export default authRouter
