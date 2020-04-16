import { Context } from 'koa'

export const createRoom = async (ctx: Context) => {
  const { body: { username, name, avatarColor } } = ctx.request

  const user = await ctx.state.userRepository.save({
    username,
    avatarColor,
  })

  const room = await ctx.state.roomRepository.save({
    name,
    users: [user],
  })

  ctx.body = room
}