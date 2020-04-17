import { Context } from 'koa'

export const createRoom = async (ctx: Context) => {
  const { body: { username, name, avatarColor } } = ctx.request

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

  const room = await ctx.state.roomRepository.save({
    name,
    users: [user],
    red,
    blue,
  })

  ctx.body = {
    room: await ctx.state.roomRepository.findOne({
      id: room.id,
      relations: ['users', 'red', 'blue'],
    }),
    user,
  }
}