import { compare } from 'bcrypt'
import { badData } from 'boom'

import { encrypt, cryptGenerate } from '../../../utils/bcrypt'
import { addHours } from '../../../utils/date'
import { strongPassword } from '../../../utils/validate.regex'
import transporter from '../../mailer'
import { signJWT } from '../config/jwt'

export async function registerUser({ email, username, password }) {
  if (!email && !username) {
    throw badData('please provide username or email')
  }
  if (!password || !password.match(strongPassword)) {
    throw badData('weak password or not provided')
  }
  if (!username) {
    username = email.split('@')[0]
  }
  password = await encrypt(password)

  const { validationToken, tokenExpiration } = generateTokenValidation()

  return {
    username,
    password,
    email,
    validation_token: validationToken,
    token_expiration: tokenExpiration
  }
}

export function generateTokenValidation() {
  const validationToken = cryptGenerate()
  const tokenExpiration = addHours(Date.now(), 4)
  return { validationToken, tokenExpiration }
}

export async function sendForgotPasswordEmail({
  username,
  email,
  validation_token: token
}) {
  await transporter.sendMail({
    from: `"${username}" <${email}>`,
    to: 'automatic@email.com',
    subject: 'forgot password',
    text: 'automatic email, do not reply',
    html: `
    <h1>Hello ${username}?</h1>

    <p>please, click in this link for generate new password</p>

    <br/>
    <a href="http://localhost:3000/auth/replay_password/${token()}">CONFIRM</a>
    `
  })
}

export async function sendConfirmEmail({
  username,
  email,
  validation_token: token
}) {
  await transporter.sendMail({
    from: `"${username}" <${email}>`,
    to: 'automatic@email.com',
    subject: 'activation account',
    text: 'automatic email, do not reply',
    html: `
    <h1>Hello ${username}?</h1>

    <p>please, click in this link for active your account</p>

    <br/>
    <a href="http://localhost:3000/auth/activate_account/${token()}">CONFIRM</a>
    `
  })
}

export function verifyAccount(user) {
  if (!user) throw badData('inválid token')

  const { validation_token: token, token_expiration: expiration } = user

  if (!token) throw badData('unformed token validation')
  if (expiration < new Date()) throw badData('token expired')

  user.validation_token = null
  user.token_expiration = null
  user.active_account = true

  return user
}

export function whereAuthenticate({ email, username, password }) {
  if (!email && !username) throw badData('please provide username or email')
  if (!password) throw badData('password not provided')
  const where = email ? { email } : { username }
  return { where }
}

export async function checkUserAndGenerateToken(body, user) {
  checkUserAccount(user)

  const match = await compare(body.password, user.password())

  if (!match) throw badData('incorrect password')

  return signJWT({ userId: user.id })
}

export function checkEmail({ email }) {
  if (!email) throw badData('please provide your email')
}

export function checkUserAccount(user) {
  if (!user) throw badData('no user found for this email')
  if (!user.active_account) throw badData('account not enabled')
}
