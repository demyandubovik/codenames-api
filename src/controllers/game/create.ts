import sampleSize from 'lodash.samplesize'
import difference from 'lodash.difference'
import shuffle from 'lodash.shuffle'
import { SocketEvents } from 'constants/socketEvents'
import { isCaptain } from 'helpers/user'

export const createGame = async ctx => {
  const roomId = ctx.state.user.room.id

  if (await ctx.state.gameRepository.findOne({ roomId, active: true })) {
    return ctx.throw(403)
  }

  const firstTeam = sampleSize(['red', 'blue'])[0]
  const secondTeam = difference(['red', 'blue'], [firstTeam])[0]

  const room = await ctx.state.roomRepository.findOne(roomId, {
    relations: ['red', 'blue'],
  })

  // if (!room.red.captainId || !room.blue.captainId) {
  //   return ctx.throw(403)
  // }

  const game = await ctx.state.gameRepository.save({
    roomId,
    schema: [],
    answered: [],
    activeTeam: room[firstTeam].id,
    startTeamId: room[firstTeam].id,
  })

  let words = await ctx.state.wordRepository.createQueryBuilder('word')
    .orderBy('RANDOM()')
    .limit(25)
    .getMany()

  const firstTeamWords = sampleSize(words, 9)
  words = difference(words, firstTeamWords)

  const secondTeamWords = sampleSize(words, 8)
  words = difference(words, secondTeamWords)

  const neutralWords = sampleSize(words, 7)
  words = difference(words, neutralWords)

  const blackWord = sampleSize(words)[0]

  const schema = shuffle([
    ...firstTeamWords,
    ...secondTeamWords,
    ...neutralWords,
    blackWord,
  ].map(item => item.id))

  game[`${firstTeam}Words`] = firstTeamWords
  game[`${secondTeam}Words`] = secondTeamWords
  game.neutralWords = neutralWords
  game.blackWord = blackWord
  game.schema = schema

  await ctx.state.gameRepository.save(game)

  const data = await ctx.state.customGameRepository.get(game.id)
  const captainData = await ctx.state.customGameRepository.getForCaptain(game.id)
  const sockets = ctx.io.sockets.in(room.id).sockets

  Object.keys(sockets).forEach(socketId => {
    const { userId } = sockets[socketId]

    if (userId === ctx.state.user.id) return

    ctx.io.to(socketId).emit(SocketEvents.gameCreated, isCaptain(userId, room) ? captainData : data)
  })

  ctx.body = isCaptain(ctx.state.user.id, room)
    ? captainData
    : data
}