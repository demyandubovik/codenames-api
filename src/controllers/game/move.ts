import { inverseTeam, isCaptain } from 'helpers/user'
import { handleScore } from 'helpers/move'
import { WordTypes } from 'repositories/GameRepository'
import { SocketEvents } from 'constants/socketEvents'
import { sendGameUpdate } from 'helpers/socket'

export const move = async ctx => {
  const { wordId } = ctx.request.body

  const user = await ctx.state.userRepository.findOne(ctx.state.user.id, {
    relations: ['team'],
  })
  const game = await ctx.state.gameRepository.findOne({
    roomId: ctx.state.user.room.id,
    finished: false,
  }, {
    relations: ['activeTeam'],
  })

  if (!wordId) return ctx.throw(403)
  if (!game) return ctx.throw(404)
  if (!user.team) return ctx.throw(403)
  if (game.activeTeam.id !== user.team.id) return ctx.throw(403)
  if (user.id === user.team.captainId) return ctx.throw(403)
  if (game.answered.includes(wordId)) return ctx.throw(403)

  const schema = await ctx.state.customGameRepository.getScheme(game.id, true)
  const word = schema.find(item => item.id === wordId)
  const isRightAnswer = word.type === user.team.type

  game.answered = [...game.answered, wordId]

  if (!isRightAnswer) {
    const inversedTeam = ctx.state.room[inverseTeam(user.team.type)]

    if (word.type === WordTypes.killer) {
      game.finished = true
      game.winner = inversedTeam
    } else {
      game.activeTeam = inversedTeam
    }
  }

  await ctx.state.moveRepository.save({
    word: wordId,
    team: ctx.state.user.team,
    game,
  })

  handleScore(game, user.team.type, word.type)

  await ctx.state.gameRepository.save(game)

  const data = await ctx.state.customGameRepository.get(game.id)
  const captainData = await ctx.state.customGameRepository.getForCaptain(game.id)

  sendGameUpdate({ room: ctx.state.room, user, captainData, data, io: ctx.io, eventName: SocketEvents.gameUpdate })

  ctx.body = isCaptain(ctx.state.user.id, ctx.state.room)
    ? captainData
    : data

}