import { Game } from 'entities/Game'
import { WordTypes } from 'repositories/GameRepository'

export const handleScore = (game: Game, type: 'red' | 'blue', wordType: WordTypes) => {
  if (wordType === WordTypes.blue || wordType === WordTypes.red) {
    const scoreKey = `${wordType}Score`
    game[scoreKey] += 1
  }
}