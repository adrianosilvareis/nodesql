import { badData } from 'boom'
import jwt from 'jsonwebtoken'

export const signJWT = async payload =>
  jwt.sign(payload, process.env.JWT_SECRETY, { expiresIn: '10h' })
