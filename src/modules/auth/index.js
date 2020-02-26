import jwt from 'koa-jwt'

import dotenv from 'dotenv'
import path from 'path'

import autoImport from '../../utils/auto-import'

const url = path.resolve(__dirname, 'routes')

dotenv.config()

const secret = process.env.JWT_SECRETY

export default app => {
  app.use(jwt({ secret }).unless({ path: [/^\/auth/] }))
  autoImport(app, url, /.routes.js$/)
}
