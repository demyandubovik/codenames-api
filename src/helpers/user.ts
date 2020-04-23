export const isCaptain = (userId, room) => room.red.captainId === userId || room.blue.captainId === userId
