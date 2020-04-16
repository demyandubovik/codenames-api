import { Context } from 'koa'

export const joinRoom = async (ctx: Context) => {
  const { body: { roomId, username } } = ctx.request

  const room = await ctx.state.roomRepository.findOne({
    id: roomId,
    relations: ['users'],
  })

  if (!room) {
    ctx.throw(404)
  }

  const user = await ctx.state.userRepository.save({
    username,
  })

  room.users.push(user)

  await ctx.state.roomRepository.save(room)

  ctx.body = {
    room,
    user,
  }
}