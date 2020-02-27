import { forbidden } from 'boom'
import { Op } from 'sequelize'

import { addHours } from '../../../utils/date'
import CfgUser from '../../config/models/CfgUser'
import Session from '../models/MdaSession'

export const clearExpiredSessions = async () => {
  const expiredSessions = await Session.findAll({
    where: {
      active: true,
      token_expiration: {
        [Op.lt]: new Date()
      }
    }
  })

  await Promise.all(
    expiredSessions.map(async session => {
      session.active = false
      session.save()

      return session
    })
  )
}

export const createSession = async (user, token) => {
  await clearExpiredSessions()

  const sessions = await Session.count({
    where: {
      user_id: user.id,
      active: true,
      token_expiration: {
        [Op.gt]: new Date()
      }
    }
  })

  const { value } = await CfgUser.findOne({
    where: { key: 'session_limit' }
  })

  const sessionLimit = parseInt(value)

  if (sessions >= sessionLimit)
    throw forbidden('maximum session limit for this user')

  const session = await Session.create({
    token,
    user_id: user.id,
    token_expiration: addHours(Date.now(), 4),
    active: true
  })

  return session
}
