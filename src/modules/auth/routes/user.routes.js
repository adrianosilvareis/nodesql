import Router from 'koa-router'

import { replayPassword } from '../controller/auth.controller'

const router = new Router({
  prefix: '/user'
})

router.post('/', replayPassword) // crear
router.get('/:id', replayPassword) // obter
router.put('/:id', replayPassword) // autalizar
router.delete('/:id', replayPassword) // deletar
router.put('/replay_password', replayPassword)

module.exports = app => {
  app.use(router.routes()).use(router.allowedMethods())
}
