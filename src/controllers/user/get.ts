export const getUser = async ctx => {
  const user = await ctx.state.userRepository.findOne(ctx.state.user.id)
  const room = await ctx.state.roomRepository.findOne(ctx.state.user.room.id, {
    relations: ['users', 'red', 'blue'],
  })

  ctx.body = {
    user,
    room,
  }
}