import Router from 'koa-router'
import { authenticationMiddleware } from 'middlewares/authentication'
import { getUser } from 'controllers/user/get'
import { generateNickname } from 'controllers/user/generateNickname'

const router = new Router({
  prefix: '/user',
})

router.get('/name/generate', generateNickname)
router.use(authenticationMiddleware)
router.get('/', getUser)

export {
  router,
}