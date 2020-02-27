import Router from 'koa-router'

import { index, get, update, remove } from '../controller/user.controller'

const router = new Router({
  prefix: '/config/users'
})

router.get('/list', index)
router.get('/:id', get)
router.put('/:id', update)
router.delete('/list', remove)

module.exports = app => {
  app.use(router.routes()).use(router.allowedMethods())
}
