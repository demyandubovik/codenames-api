import Router from 'koa-router'
import { authenticationMiddleware } from 'middlewares/authentication'
import { getUser } from 'controllers/user/get'

const router = new Router({
  prefix: '/user',
})

router.use(authenticationMiddleware)
router.get('/', getUser)

export {
  router,
}