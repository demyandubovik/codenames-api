require('dotenv').config()

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { router } from 'routes'

const app = new Koa()

app.use(bodyParser())
app.use(cors({ origin: '*' }))

app.use(router.routes())

app.use(async ctx => {
  ctx.body = 'ts!'
})

app.listen(process.env.PORT || 3000)
