import { router as roomRouter } from 'routes/v1/room'
import { router as teamRouter } from 'routes/v1/team'
import { router as userRouter } from 'routes/v1/user'
import { router as gameRouter } from 'routes/v1/game'
import Router from 'koa-router'

const router = new Router({
  prefix: '/v1'
})

router.use(roomRouter.routes(), roomRouter.allowedMethods())
router.use(teamRouter.routes(), teamRouter.allowedMethods())
router.use(userRouter.routes(), userRouter.allowedMethods())
router.use(gameRouter.routes(), gameRouter.allowedMethods())

export {
  router
}
