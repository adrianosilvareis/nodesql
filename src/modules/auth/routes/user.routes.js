import Router from 'koa-router'

import {
  index,
  replayPassword,
  getUser,
  cancelUser
} from '../controller/user.controller'

const router = new Router({
  prefix: '/users'
})

router.get('/list', index)
router.get('/:id', getUser)
router.patch('/:id/cancel', cancelUser)
router.put('/replay_password', replayPassword)

module.exports = app => {
  app.use(router.routes()).use(router.allowedMethods())
}
