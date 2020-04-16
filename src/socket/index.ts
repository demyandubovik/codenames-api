import { SocketEvents } from 'constants/socketEvents'

export const onConnect = socket => {
  socket.on(SocketEvents.auth, ({ userId, roomId }) => {
    socket.userId = userId
    socket.join(roomId)
  })
}
