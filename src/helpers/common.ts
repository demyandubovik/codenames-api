import { teamNames } from 'constants/nicknames'
import { random } from 'helpers/math'
import difference from 'lodash.difference'

export const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.substring(1)

export const getRandomTeamName = (exclude?: string[]) => {
  const all = exclude ? difference(teamNames, exclude) : teamNames
  return all[random(0, all.length - 1)]
}
