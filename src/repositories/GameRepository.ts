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

}