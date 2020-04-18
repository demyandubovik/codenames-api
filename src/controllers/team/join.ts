import { SocketEvents } from 'constants/socketEvents'

export const joinTeam = async ctx => {
  const { id } = ctx.request.body

  const team = await ctx.state.teamRepository.findOne(id)

  if (!team) {
    return ctx.throw(404)
  }

  ctx.state.user.team = team
  await ctx.state.userRepository.save(ctx.state.user)

  const user = await ctx.state.userRepository.findOne(ctx.state.user)

  ctx.io.sockets.in(ctx.state.user.room.id).emit(SocketEvents.userUpdate, user)

  ctx.body = user
}