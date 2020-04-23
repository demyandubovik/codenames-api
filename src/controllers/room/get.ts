export const getRoom = async ctx => {
  const user = await ctx.state.userRepository.findOne(ctx.state.user.id)
  const room = await ctx.state.roomRepository.findOne(ctx.state.user.room.id, {
    relations: ['users', 'red', 'blue'],
  })

  const activeGame = await ctx.state.gameRepository.findOne({
    roomId: room.id,
    active: true,
  })

  const isCaptain = user.id === room.red.captainId || user.id === room.blue.captainId

  const game = activeGame
    ? await ctx.state.customGameRepository[isCaptain ? 'getForCaptain' : 'get'](activeGame.id)
    : null

  ctx.body = {
    room,
    user,
    game,
  }
}