import bcrypt from 'bcrypt'
import crypto from 'crypto'

const SALT_ROUNDS = 10

export const encrypt = async password => bcrypt.hash(password, SALT_ROUNDS)

export const compare = async (candidate, hash) =>
  bcrypt.compare(candidate, hash)

export const cryptGenerate = (randomBytes = 20, type = 'hex') =>
  crypto.randomBytes(randomBytes).toString(type)
