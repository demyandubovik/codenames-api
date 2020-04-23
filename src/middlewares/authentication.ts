export const authenticationMiddleware = async (ctx, next) => {
  const userId = ctx.request.headers['user-id']
  if (userId) {
    const user = await ctx.state.userRepository.findOne(userId, {
      relations: ['room', 'team'],
    })

    if (!user) {
      return ctx.throw(401)
    }

  const room = await ctx.state.roomRepository.findOne(user.room.id, {
    relations: ['red', 'blue', 'games']
  })

    ctx.state.user = user
    ctx.state.room = room

  } else {
    ctx.throw(401)
  }

  await next()
}