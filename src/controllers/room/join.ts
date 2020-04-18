import { Context } from 'koa'
import { SocketEvents } from 'constants/socketEvents'

export const joinRoom = async (ctx: Context) => {
  const { body: { roomId, username, avatarColor } } = ctx.request

  const room = await ctx.state.roomRepository.findOne(roomId, {
    relations: ['users', 'red', 'blue'],
  })

  if (!room) {
    ctx.throw(404)
  }

  const user = await ctx.state.userRepository.save({
    username,
    avatarColor,
  })

  room.users.push(user)

  await ctx.state.roomRepository.save(room)

  ctx.io.sockets.in(room.id).emit(SocketEvents.userConnected, user)

  ctx.body = {
    room,
    user,
  }
}