import Router from 'koa-router'
import { createRoom } from 'controllers/room/create'
import { joinRoom } from 'controllers/room/join'
import { authenticationMiddleware } from 'middlewares/authentication'
import { getRoom } from 'controllers/room/get'

const router = new Router({
  prefix: '/room',
})

router.post('/', createRoom)
router.post('/join', joinRoom)
router.use(authenticationMiddleware)
router.get('/', getRoom)

export {
  router,
}