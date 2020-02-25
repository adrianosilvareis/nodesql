import dotenv from 'dotenv'
import { createTransport } from 'nodemailer'

dotenv.config()

const {
  EMAIL_HOST: host,
  EMAIL_PORT: port,
  EMAIL_USER: user,
  EMAIL_PASS: pass
} = process.env

const transporter = createTransport({
  host,
  port,
  auth: { user, pass }
})

export default transporter
