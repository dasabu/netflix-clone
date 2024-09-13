import axios from 'axios'
import { envConfig } from '../config/env.config.js'
import ApiError from '../models/api/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import { AXIOS_ERROR_RESOURCE_NOT_FOUND } from '../constants/messages.js'

export const fetchFromTMDB = async (url) => {
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${envConfig.TMBD_API_KEY}`,
    },
  }

  return axios
    .get(url, config)
    .then((response) => response.data)
    .catch((error) => {
      throw new ApiError(
        StatusCodes.NOT_FOUND || error.status,
        AXIOS_ERROR_RESOURCE_NOT_FOUND || error.message
      )
    })

  // if (response.status !== 200) {
  //   throw new ApiError(response.status, response.statusText)
  // } else {
  //   return response.data
  // }
}
