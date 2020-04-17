import Router from 'koa-router'
import { joinTeam } from 'controllers/team/join'
import { authenticationMiddleware } from 'middlewares/authentication'
import { makeCaptain } from 'controllers/team/makeCaptain'

const router = new Router({
  prefix: '/team',
})

router.use(authenticationMiddleware)
router.post('/join', joinTeam)
router.post('/captain', makeCaptain)

export {
  router,
}