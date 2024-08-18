import { StatusCodes } from 'http-status-codes'

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    this.description = StatusCodes[statusCode]
  }
}

export default ApiError
