import { Context } from 'koa'
import { WordTypes } from 'repositories/GameRepository'

export const createRoom = async (ctx: Context) => {
  const { body: { username, name, avatarColor } } = ctx.request

  const room = await ctx.state.roomRepository.save({
    name,
  })

  const red = await ctx.state.teamRepository.save({
    name: 'Red Team',
    type: WordTypes.red,
  })

  const blue = await ctx.state.teamRepository.save({
    name: 'Blue Team',
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