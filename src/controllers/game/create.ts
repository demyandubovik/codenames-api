import sampleSize from 'lodash.samplesize'
import difference from 'lodash.difference'
import shuffle from 'lodash.shuffle'
import { isCaptain } from 'helpers/user'
import { sendGameUpdate } from 'helpers/socket'

export const createGame = async ctx => {
  const roomId = ctx.state.user.room.id

  if (await ctx.state.gameRepository.findOne({ roomId, finished: false })) {
    return ctx.throw(403)
  }

  const firstTeam = sampleSize(['red', 'blue'])[0]
  const secondTeam = difference(['red', 'blue'], [firstTeam])[0]

  const { room } = ctx.state

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

  sendGameUpdate({ room, user: ctx.state.user, io: ctx.io, captainData, data })

  ctx.body = isCaptain(ctx.state.user.id, room)
    ? captainData
    : data
}