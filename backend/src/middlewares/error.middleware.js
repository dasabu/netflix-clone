import { StatusCodes } from 'http-status-codes'

export const errorHandler = (err, req, res, next) => {
  const responseError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.description || StatusCodes[err.statusCode],
    message: err.message || 'Something broken',
  }

  res.status(responseError.statusCode).json(responseError)
}
