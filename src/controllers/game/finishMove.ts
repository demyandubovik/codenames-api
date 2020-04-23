import { inverseTeam, isCaptain } from 'helpers/user'
import { sendGameUpdate } from 'helpers/socket'
import { SocketEvents } from 'constants/socketEvents'

export const finishMove = async ctx => {
  const activeGame = await ctx.state.gameRepository.findOne({
    roomId: ctx.state.room.id,
    finished: false,
  }, {
    relations: ['activeTeam'],
  })

  if (!activeGame) return ctx.throw(403)
  if (!ctx.state.user.team) return ctx.throw(403)
  if (ctx.state.user.team.id !== activeGame.activeTeam.id) return ctx.throw(403)

  activeGame.activeTeam = ctx.state.room[inverseTeam(ctx.state.user.team.type)]

  await ctx.state.gameRepository.save(activeGame)

  const captainData = await ctx.state.customGameRepository.getForCaptain(activeGame.id)
  const data = await ctx.state.customGameRepository.get(activeGame.id)

  sendGameUpdate({ room: ctx.state.room, user: ctx.state.user, captainData, data, eventName: SocketEvents.gameUpdate, io: ctx.io })

  ctx.body = isCaptain(ctx.state.user.id, ctx.state.room)
    ? captainData
    : data
}