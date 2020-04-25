import { Context } from 'koa'
import { WordTypes } from 'repositories/GameRepository'
import { getRandomTeamName } from 'helpers/common'

export const createRoom = async (ctx: Context) => {
  const { body: { username, name, avatarColor } } = ctx.request

  const room = await ctx.state.roomRepository.save({
    name,
  })

  const redName = getRandomTeamName()
  const blueName = getRandomTeamName([redName])

  const red = await ctx.state.teamRepository.save({
    name: redName,
    type: WordTypes.red,
  })

  const blue = await ctx.state.teamRepository.save({
    name: blueName,
    type: WordTypes.blue,
  })

  const user = await ctx.state.userRepository.save({
    username,
    avatarColor,
  })

  room.red = red
  room.blue = blue
  room.users = [user]

  await ctx.state.roomRepository.save(room)

  ctx.body = {
    room,
    user,
  }
}