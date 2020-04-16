import { connect, connectionMiddleware } from 'middlewares/connection'
import 'reflect-metadata'
require('dotenv').config()

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { router } from 'routes'
import http from 'http'
import socket from 'socket.io'
import { onConnect } from 'socket'

const app = new Koa()

app.use(cors({ origin: 'https://gracious-engelbart-7cea54.netlify.app', credentials: true }))

const server = http.createServer(app.callback())
const io = socket(server, { origins: '*:*' })

io.on('connection', onConnect)

app.use(bodyParser())
app.use(connectionMiddleware)

app.use(async (ctx, next) => {
  ctx.io = io
  await next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())

connect()
  .then(() => {
    console.log('Successfully connected to Database')
    server.listen(process.env.PORT || 3000)
  })
