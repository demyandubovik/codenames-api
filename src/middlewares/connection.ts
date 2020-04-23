import { createConnection, getConnection } from 'typeorm'
import { User } from 'entities/User'
import { Room } from 'entities/Room'
import { Team } from 'entities/Team'
import { Word } from 'entities/Word'
import { Game } from 'entities/Game'
import { CustomGameRepository } from 'repositories/GameRepository'
import { Move } from 'entities/Move'

require('dotenv').config()

const entities = [
  User,
  Room,
  Team,
  Word,
  Game,
  Move,
]

export const connectionMiddleware = async (ctx, next) => {
  ctx.state.connection = await getConnection()

  entities.forEach(entity => {
    ctx.state[
      `${ctx.state.connection.getMetadata(entity).name.toLowerCase()}Repository`
    ] = ctx.state.connection.getRepository(entity)
  })

  ctx.state.customGameRepository = ctx.state.connection.getCustomRepository(CustomGameRepository)

  await next()
}

export const connect = () => createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: true,
  logging: false,
  cache: false,
  entities,
})
