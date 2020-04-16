import Router from 'koa-router'
import { router as v1Router } from 'routes/v1'

const router = new Router({
  prefix: '/api',
})

router.use(v1Router.routes(), v1Router.allowedMethods())

export {
  router,
}
