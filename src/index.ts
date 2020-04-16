import { connect, connectionMiddleware } from 'middlewares/connection'
import 'reflect-metadata'
require('dotenv').config()

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { router } from 'routes'

const app = new Koa()

app.use(bodyParser())
app.use(cors({ origin: '*' }))
app.use(connectionMiddleware)

app
  .use(router.routes())
  .use(router.allowedMethods())

connect()
  .then(() => {
    console.log('Successfully connected to Database')
    app.listen(process.env.PORT || 3000)
  })
