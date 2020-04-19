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
import { whiteList } from 'constants/origins'
import { wordsTransaction } from 'transactions/wordsTransaction'

const app = new Koa()

app.use(cors({ origin: ctx => {
  if (whiteList.includes(ctx.request.headers.origin)) {
    return ctx.request.headers.origin
  }
}, credentials: true }))

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
  .then(async connection => {
    await wordsTransaction(connection)
    console.log('Successfully connected to Database')
    server.listen(process.env.PORT || 3000)
  })
