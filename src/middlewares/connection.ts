import { createConnection, getConnection } from 'typeorm'
import { User } from 'entities/User'
import { Room } from 'entities/Room'
import { Team } from 'entities/Team'

require('dotenv').config()

const entities = [
  User,
  Room,
  Team,
]

export const connectionMiddleware = async (ctx, next) => {
  ctx.state.connection = await getConnection()
  entities.forEach(entity => {
    ctx.state[
      `${ctx.state.connection.getMetadata(entity).name.toLowerCase()}Repository`
    ] = ctx.state.connection.getRepository(entity)
  })
  await next()
}

export const connect = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities,
})
