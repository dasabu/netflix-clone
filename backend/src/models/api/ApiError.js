import { StatusCodes } from 'http-status-codes'

class ApiError extends Error {
  constructor(statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message) {
    super(message)
    this.statusCode = statusCode
    this.description = StatusCodes[statusCode]
  }
}

export default ApiError
