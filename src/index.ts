import Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'ts!'
})

app.listen(3000)
