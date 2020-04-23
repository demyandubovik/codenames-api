import { EntityRepository, AbstractRepository } from 'typeorm'
import { Game } from 'entities/Game'
import { Word } from 'entities/Word'

export enum WordTypes {
  red = 'red',
  neutral = 'neutral',
  blue = 'blue',
  killer = 'killer',
}

@EntityRepository(Game)
export class CustomGameRepository extends AbstractRepository<Game> {


  async getScheme(gameId, isCaptain) {
    const game = await this.repository.findOne(gameId, {
      relations: ['activeTeam', 'winner', 'redWords', 'blueWords', 'neutralWords', 'blackWord'],
    })

    const redWords = game.redWords.map(item => item.id)
    const blueWords = game.blueWords.map(item => item.id)
    const neutralWords = game.neutralWords.map(item => item.id)
    const blackWord = game.blackWord.id

    return await Promise.all(
      game.schema.map(async item => {
        const word = await this.manager.getRepository(Word).findOne(item)
        let type

        if (!isCaptain && !game.answered.includes(word.id)) type = null
        else if (redWords.includes(word.id)) type = 'red'
        else if (blueWords.includes(word.id)) type = 'blue'
        else if (neutralWords.includes(word.id)) type = 'neutral'
        else if (blackWord === word.id) type = 'killer'

        return {
          ...word,
          type
        }
      })
    )
  }

  async get(id) {
    const game = await this.repository.findOne(id, {
      relations: ['activeTeam', 'winner'],
    })

    const schema = await this.getScheme(game.id, false)

    return {
      ...game,
      schema,
    }
  }

  async getForCaptain(id) {
    const game = await this.repository.findOne(id, {
      relations: ['activeTeam', 'winner'],
    })

    const schema = await this.getScheme(game.id, true)

    return {
      ...game,
      schema,
    }
  }

}