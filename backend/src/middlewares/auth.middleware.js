import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import { EMAIL_REGEX } from '../constants/common.js'
import { StatusCodes } from 'http-status-codes'
import { AUTH_MESSAGE } from '../constants/messages.js'
import ApiError from '../models/api/ApiError.js'

export const signupMiddleware = async (req, res, next) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        AUTH_MESSAGE.ALL_FIELDS_NEED_TO_BE_FILLED
      )
    }

    const emailRegex = EMAIL_REGEX
    if (!emailRegex.test(email)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, AUTH_MESSAGE.INVALID_EMAIL)
    }

    if (password.length < 6) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        AUTH_MESSAGE.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS
      )
    }

    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      User.findOne({ email: email }),
      User.findOne({ username: username }),
    ])
    if (existingUserByEmail) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        AUTH_MESSAGE.EMAIL_ALREADY_EXISTS
      )
    }
    if (existingUserByUsername) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        AUTH_MESSAGE.USERNAME_ALREADY_EXISTS
      )
    }
    // if pass all, move to controller
    next()
  } catch (error) {
    // if error exists, move to error handler
    next(error)
  }
}

export const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        AUTH_MESSAGE.ALL_FIELDS_NEED_TO_BE_FILLED
      )

    const user = await User.findOne({ email: email })
    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        AUTH_MESSAGE.INVALID_CREDENTIALS
      )
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        AUTH_MESSAGE.INVALID_CREDENTIALS
      )
    }
    // pass all, assign user to request and move to controller
    req.user = user
    next()
  } catch (error) {
    // if error exists, move to error handler
    next(error)
  }
}
