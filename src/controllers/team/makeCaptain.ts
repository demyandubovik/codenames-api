import { SocketEvents } from 'constants/socketEvents'

export const makeCaptain = async ctx => {
  const { teamId } = ctx.request.body

  const team = await ctx.state.teamRepository.findOne(teamId)

  if (!team) {
    return ctx.throw(404)
  }

  if (team.id !== ctx.state.user.teamId) {
    return ctx.throw(403)
  }

  team.captainId = ctx.state.user.id
  await ctx.state.teamRepository.save(team)

  ctx.io.sockets.in(ctx.state.user.room.id).emit(SocketEvents.teamUpdate, team)
  ctx.body = team
}