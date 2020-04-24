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

  const activeGame = await ctx.state.gameRepository.findOne({
    roomId: room.id,
    active: true,
  })

  const isCaptain = user.id === room.red.captainId || user.id === room.blue.captainId

  const game = activeGame
    ? await ctx.state.customGameRepository[isCaptain ? 'getForCaptain' : 'get'](activeGame.id)
    : null

  ctx.io.sockets.in(room.id).emit(SocketEvents.userConnected, user)

  ctx.body = {
    room,
    user,
    game,
  }
}