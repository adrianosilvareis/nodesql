import { encrypt } from '../../../utils/bcrypt'
import User from '../models/MdaUser'

export const replayPassword = async ctx => {
  try {
    const { userId } = ctx.state.user
    const { password } = ctx.request.body

    const user = await User.findByPk(userId)
    user.password = await encrypt(password)
    const newUser = await user.save()

    ctx.body = newUser
  } catch (error) {
    ctx.throw(error)
  }
}

export const index = async ctx => {
  try {
    const users = await User.findAll({ where: { active_account: true } })
    ctx.body = users
  } catch (error) {
    ctx.throw(error)
  }
}

export const getUser = async ctx => {
  try {
    const { id } = ctx.params
    const user = await User.findByPk(id)
    ctx.body = user
  } catch (error) {
    ctx.throw(error)
  }
}

export const cancelUser = async ctx => {
  try {
    const { id } = ctx.params
    const user = await User.findByPk(id)
    user.active_account = false
    const canceledUser = await user.save()
    ctx.body = canceledUser
  } catch (error) {
    ctx.throw(error)
  }
}
