import { createConnection, getConnection } from 'typeorm'
import { User } from 'entities/User'
import { Room } from 'entities/Room'

require('dotenv').config()

export const connectionMiddleware = async (ctx, next) => {
  ctx.state.connection = await getConnection()
  ctx.state.userRepository = ctx.state.connection.getRepository(User)
  ctx.state.roomRepository = ctx.state.connection.getRepository(Room)
  await next()
}

export const connect = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: [
    User,
    Room,
  ],
})
