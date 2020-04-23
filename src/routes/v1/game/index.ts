import Router from 'koa-router'
import { createGame } from 'controllers/game/create'
import { authenticationMiddleware } from 'middlewares/authentication'
import { move } from 'controllers/game/move'
import { finishMove } from 'controllers/game/finishMove'

const router = new Router({
  prefix: '/game',
})

router.use(authenticationMiddleware)
router.post('/', createGame)
router.post('/move', move)
router.post('/move/finish', finishMove)

export {
  router,
}