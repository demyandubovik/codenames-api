export const authenticationMiddleware = async (ctx, next) => {
  const userId = ctx.request.headers['user-id']
  if (userId) {
    const user = await ctx.state.userRepository.findOne({
      id: userId,
    }, {
      relations: ['room'],
    })

    if (!user) {
      return ctx.throw(401)
    }

    ctx.state.user = user

  } else {
    ctx.throw(401)
  }

  await next()
}