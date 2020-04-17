export const getRoom = async ctx => {
  ctx.body = await ctx.state.roomRepository.findOne(ctx.state.user.room.id, {
    relations: ['users', 'red', 'blue'],
  })
}