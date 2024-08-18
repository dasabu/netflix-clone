import jwt from 'jsonwebtoken'

import { envConfig } from '../config/envConfig.js'

export const generateTokenAndSetCookie = (userId, res) => {
  const access_token = jwt.sign({ userId }, envConfig.JWT_SECRET, {
    expiresIn: '15d',
  })
  // save into cookie
  res.cookie('access_token', access_token, {
    httpOnly: true, // prevent XSS attack: this cookie is only accessible by web browser
    sameSite: 'strict', // prevent CSRF
    secure: envConfig.NODE_ENV !== 'development',
  })

  return access_token
}
