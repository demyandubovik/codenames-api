import { EntityRepository, AbstractRepository } from 'typeorm'
import { Game } from 'entities/Game'
import { Word } from 'entities/Word'

@EntityRepository(Game)
export class CustomGameRepository extends AbstractRepository<Game> {

  async get(id) {
    const game = await this.repository.findOne(id, {
      relations: ['activeTeam', 'winner'],
    })

    const schema = await Promise.all(
      game.schema.map(async item => await this.manager.getRepository(Word).findOne(item))
    )

    return {
      ...game,
      schema,
    }
  }

  async getForCaptain(id) {
    const game = await this.repository.findOne(id, {
      relations: ['activeTeam', 'winner', 'redWords', 'blueWords', 'neutralWords', 'blackWord'],
    })

    const redWords = game.redWords.map(item => item.id)
    const blueWords = game.blueWords.map(item => item.id)
    const neutralWords = game.neutralWords.map(item => item.id)
    const blackWord = game.blackWord.id

    const schema = await Promise.all(
      game.schema.map(async item => {
        const word = await this.manager.getRepository(Word).findOne(item)
        let type = ''

        if (redWords.includes(word.id)) type = 'red'
        if (blueWords.includes(word.id)) type = 'blue'
        if (neutralWords.includes(word.id)) type = 'neutral'
        if (blackWord === word.id) type = 'killer'

        return {
          ...word,
          type
        }
      })
    )

    return {
      ...await this.repository.findOne(id, {
        relations: ['activeTeam', 'winner'],
      }),
      schema,
    }
  }

}