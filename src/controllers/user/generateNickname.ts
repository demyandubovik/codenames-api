import { random } from 'helpers/math'
import { additions, adjectives, defaultEndings, nouns } from 'constants/nicknames'
import { capitalize } from 'helpers/common'

export const generateNickname = async ctx => {
  const gender = random()
  const withAdjective = !!random()

  const adjective = withAdjective ? adjectives[random(0, adjectives.length - 1)] : null
  const noun = nouns[gender][random(0, nouns[gender].length - 1)]
  const addition = !withAdjective ? additions[random(0, additions.length - 1)] : null

  console.log(gender, withAdjective, adjective, noun, addition)

  const username = `${adjective ? `${adjective[0]}${adjective[gender + 1] || defaultEndings[gender]} ` : ''}${noun}${addition ? ` ${addition}` : ''}`

  ctx.body = {
    username: capitalize(username),
  }
}
