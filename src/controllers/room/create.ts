import { Context } from 'koa'

export const createRoom = async (ctx: Context) => {
  const { body: { username, name, avatarColor } } = ctx.request

  const room = await ctx.state.roomRepository.save({
    name,
  })

  const red = await ctx.state.teamRepository.save({
    name: 'Red Team'
  })

  const blue = await ctx.state.teamRepository.save({
    name: 'Blue Team'
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