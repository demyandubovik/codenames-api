import Router from 'koa-router'
import { createRoom } from 'controllers/room/create'
import { joinRoom } from 'controllers/room/join'

const router = new Router({
  prefix: '/room',
})

router.post('/', createRoom)
router.post('/join', joinRoom)

export {
  router,
}