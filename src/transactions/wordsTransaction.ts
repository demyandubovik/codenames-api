import { Connection } from 'typeorm'
import { WORDS } from 'constants/words'
import { Word } from 'entities/Word'

export const wordsTransaction = async (connection: Connection) => {
  const queryRunner = connection.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()

  const words = WORDS.map(item => {
    const word = new Word()
    word.word = item
    return word
  })

  try {
    await queryRunner.manager.save(words)
    await queryRunner.commitTransaction()
  }
  catch {
    await queryRunner.rollbackTransaction()
  }
  finally {
    await queryRunner.release()
  }
}