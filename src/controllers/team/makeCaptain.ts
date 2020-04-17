import { SocketEvents } from 'constants/socketEvents'

export const makeCaptain = async ctx => {
  const { teamId, userId } = ctx.request.body

  const team = await ctx.state.teamRepository.findOne({
    id: teamId,
  })

  if (!team) {
    return ctx.throw(404)
  }

  if (!team.captainId) {
    team.captainId = ctx.state.user.id

    await ctx.state.teamRepository.save(team)

    ctx.io.sockets.in(ctx.state.user.room.id).emit(SocketEvents.teamUpdate, team)
    ctx.body = team
    return
  }

  if (team.captainId !== ctx.state.user.id || !userId) {
    return ctx.throw(403)
  }

  const user = await ctx.state.userRepository.findOne({
    id: userId,
  })

  if (!user) {
    return ctx.throw(404)
  }

  team.captainId = user.id

  await ctx.state.teamRepository.save(team)
  ctx.io.sockets.in(ctx.state.user.room.id).emit(SocketEvents.teamUpdate, team)
  ctx.body = team
}