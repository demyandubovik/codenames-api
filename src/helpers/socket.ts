import { SocketEvents } from 'constants/socketEvents'
import { isCaptain } from 'helpers/user'
import { Room } from 'entities/Room'
import { User } from 'entities/User'

interface UpdateOptions {
  room: Room,
  io: any,
  data: any,
  captainData: any,
  user: User,
  eventName?: SocketEvents,
}

export const sendGameUpdate = ({ room, io, data, captainData, user, eventName }: UpdateOptions) => {
  const sockets = io.sockets.in(room.id).sockets

  Object.keys(sockets).forEach(socketId => {
    const { userId } = sockets[socketId]

    if (userId === user.id) return

    io.to(socketId).emit(eventName || SocketEvents.gameCreated, isCaptain(userId, room) ? captainData : data)
  })
}