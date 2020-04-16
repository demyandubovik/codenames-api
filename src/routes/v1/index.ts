import { router as roomRouter } from 'routes/v1/room'
import Router from 'koa-router'

const router = new Router({
  prefix: '/v1'
})

router.use(roomRouter.routes(), roomRouter.allowedMethods())

export {
  router
}
