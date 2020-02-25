import { Op } from 'sequelize'

import User from '../models/MdaUser'
import {
  registerUser,
  sendConfirmEmail,
  verifyAccount,
  whereAuthenticate,
  checkUserBeforeAutenticate
} from './users'

export const register = async ctx => {
  try {
    const body = ctx.request.body
    const user = await registerUser(body)

    const [data, isNew] = await User.findOrCreate({
      where: { email: user.email, username: user.username },
      defaults: user
    })

    if (isNew) await sendConfirmEmail(data)

    ctx.body = { data, isNew }
  } catch (error) {
    ctx.throw(error)
  }
}

export const authenticate = async ctx => {
  try {
    const body = ctx.request.body

    const user = await User.findOne(whereAuthenticate(body))

    await checkUserBeforeAutenticate(body, user)

    // generate JWT token
    ctx.body = user
  } catch (error) {
    ctx.throw(error)
  }
}

export const forgotPassword = ctx => {
  ctx.body = 'forgotPassword'
}

export const activateAccount = async ctx => {
  const { token } = ctx.params
  try {
    const user = await User.findOne({
      where: {
        validation_token: token,
        token_expiration: {
          [Op.gt]: new Date()
        }
      }
    })

    ctx.body = await verifyAccount(user).save()
  } catch (error) {
    ctx.throw(error)
  }
}
