import { StatusCodes } from 'http-status-codes'

import { createNewUser } from '../services/auth.service.js'
import { AUTH_MESSAGE } from '../constants/messages.js'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
import ApiError from '../models/api/ApiError.js'
import { ApiResponse } from '../models/api/ApiResponse.js'

class AuthController {
  async signup(req, res) {
    const { email, password, username } = req.body
    const newUser = await createNewUser(email, password, username)

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
      throw new ApiError(AUTH_MESSAGE.AN_UNEXPECTED_ERROR_OCCURED)
    }
  }

  async login(req, res) {
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
      throw new ApiError(AUTH_MESSAGE.AN_UNEXPECTED_ERROR_OCCURED)
    }
  }

  async logout(req, res) {
    // clear access token in cookie
    res.clearCookie('access_token')
    res
      .status(StatusCodes.OK)
      .json(new ApiResponse(StatusCodes.OK, AUTH_MESSAGE.LOGOUT_SUCCESSFULLY))
  }

  async authCheck(req, res) {
    // return current authenticated user data
    if (req.user) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            AUTH_MESSAGE.GET_AUTHENTICATED_USER_SUCCESSFULLY,
            req.user
          )
        )
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            AUTH_MESSAGE.AN_UNEXPECTED_ERROR_OCCURED
          )
        )
    }
  }
}

const authController = new AuthController()
export default authController
