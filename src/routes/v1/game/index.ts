import Router from 'koa-router'
import { createGame } from 'controllers/game/create'
import { authenticationMiddleware } from 'middlewares/authentication'

const router = new Router({
  prefix: '/game',
})

router.use(authenticationMiddleware)
router.post('/', createGame)

export {
  router,
}