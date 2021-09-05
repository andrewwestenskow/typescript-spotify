import { ajax } from './index'

export const getRecentlyPlayed = () => {
  return ajax.get('/me/player/recently-played')
}
