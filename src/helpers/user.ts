import { WordTypes } from 'repositories/GameRepository'

export const isCaptain = (userId, room) => room.red.captainId === userId || room.blue.captainId === userId

export const inverseTeam = type => type === WordTypes.red ? WordTypes.blue : WordTypes.red
