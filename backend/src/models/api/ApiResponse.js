import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }

  // Automatically create response
  get response() {
    const responseObj = {
      statusCode: this.statusCode,
      status: getReasonPhrase(this.statusCode),
      message: this.message,
    }

    // just add data field into response when it's not null
    if (this.data !== null) {
      responseObj.data = this.data
    }

    return responseObj
  }

  toJSON() {
    return this.response
  }
}
