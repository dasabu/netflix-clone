import { User } from '../models/user.model.js'
import { PROFILE_PICS } from '../constants/common.js'
import bcrypt from 'bcrypt'

export const createNewUser = async (email, password, username) => {
  // random a profile image between 0 - 2
  const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hassedPassword = await bcrypt.hash(password, salt)

  // create new User
  const newUser = new User({
    email,
    username,
    password: hassedPassword,
    image,
  })

  // save new user to db
  await newUser.save()
  return newUser
}
