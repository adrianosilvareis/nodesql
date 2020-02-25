import jwt from 'koa-jwt'

import path from 'path'

import autoImport from '../../utils/auto-import'

const url = path.resolve(__dirname, 'routes')
const secret = process.env.JWT_SECRETY

export default app => {
  app.use(jwt({ secret }).unless({ path: [/^\/auth/] }))
  autoImport(app, url, /.routes.js$/)
}
