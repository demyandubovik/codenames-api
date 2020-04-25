import { getRandomTeamName } from 'helpers/common'
import { SocketEvents } from 'constants/socketEvents'

export const changeName = async ctx => {
  const { teamId, name } = ctx.request.body

  if (!teamId || ctx.state.user.teamId !== teamId) {
    return ctx.throw(403)
  }

  const team = await ctx.state.teamRepository.findOne(teamId)

  if (!team) return ctx.throw(404)

  team.name = name || getRandomTeamName([team.name])

  await ctx.state.teamRepository.save(team)

  ctx.io.sockets.in(ctx.state.user.room.id).emit(SocketEvents.teamUpdate, team)

  ctx.body = {
    room: await ctx.state.roomRepository.findOne(ctx.state.user.room.id, {
      relations: ['red', 'blue'],
    })
  }
}