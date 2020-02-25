import Router from 'koa-router'

import {
  register,
  authenticate,
  forgotPassword,
  activateAccount
} from '../controller/auth.controller'

const router = new Router({
  prefix: '/auth'
})

router.post('/register', register)
router.post('/authenticate', authenticate)
router.post('/forgot_password', forgotPassword)
router.get('/activate_account/:token', activateAccount)

module.exports = app => {
  app.use(router.routes()).use(router.allowedMethods())
}
