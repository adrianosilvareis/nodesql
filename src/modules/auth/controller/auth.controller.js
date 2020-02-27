import { Op } from 'sequelize'

import { encrypt } from '../../../utils/bcrypt'
import { signJWT } from '../config/jwt'
import User from '../models/MdaUser'
import {
  registerUser,
  sendConfirmEmail,
  verifyAccount,
  whereAuthenticate,
  checkUserAndGenerateToken,
  generateTokenValidation,
  checkUserAccount,
  checkEmail,
  sendForgotPasswordEmail
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

    const token = await checkUserAndGenerateToken(body, user)

    ctx.body = { token }
  } catch (error) {
    ctx.throw(error)
  }
}

export const forgotPassword = async ctx => {
  try {
    const { email } = ctx.request.body
    checkEmail({ email })
    const user = await User.findOne({ email })
    checkUserAccount(user)

    const { validationToken, tokenExpiration } = generateTokenValidation()
    user.validation_token = validationToken
    user.token_expiration = tokenExpiration
    await user.save()

    await sendForgotPasswordEmail(user)
    ctx.body = 'OK'
  } catch (error) {
    ctx.throw(error)
  }
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

export const getTokenByReplayPassword = async ctx => {
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

    await verifyAccount(user).save()

    const jwtToken = await signJWT({ userId: user.id })

    ctx.body = { token: jwtToken }
  } catch (error) {
    ctx.throw(error)
  }
}
