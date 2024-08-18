import authService from '../services/auth.service.js'
import { StatusCodes } from 'http-status-codes'
import { AUTH_MESSAGE } from '../constants/messages.js'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import ApiError from '../models/api/ApiError.js'
import { ApiResponse } from '../models/api/ApiResponse.js'

export const signupController = async (req, res) => {
  const { email, password, username } = req.body
  const newUser = await authService.createNewUser(email, password, username)

  if (newUser) {
    // generate access token for new user and save it into cookie
    generateTokenAndSetCookie(newUser._id, res)
    // save new user into db
    await newUser.save()
    const { password, ...userInfo } = newUser._doc
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          AUTH_MESSAGE.SIGNUP_SUCCESSFULLY,
          userInfo
        )
      )
  } else {
    // Unknowned error
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      AUTH_MESSAGE.AN_UNEXPECTED_ERROR_OCCURED
    )
  }
}

export const loginController = async (req, res) => {
  if (req.user?._id) {
    const access_token = generateTokenAndSetCookie(req.user._id, res)
    const { password, ...userInfo } = req.user._doc
    res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          AUTH_MESSAGE.LOGIN_SUCCESSFULLY,
          userInfo
        )
      )
  } else {
    // Unknowned error
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      AUTH_MESSAGE.AN_UNEXPECTED_ERROR_OCCURED
    )
  }
}

export const logoutController = async (req, res) => {
  res.clearCookie('access_token')
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, AUTH_MESSAGE.LOGOUT_SUCCESSFULLY))
}
