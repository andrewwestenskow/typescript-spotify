import { spotify } from './index'
import {
  AlbumObjectFull,
  ArtistObjectFull,
  PlayHistoryObject,
  PlaylistObjectFull,
  RecentContext,
} from 'types/spotify'
import { removeLeadingUrl } from 'utils/removeLeadingUrl'

export async function getItemFromUri(
  href: string
): Promise<AlbumObjectFull | ArtistObjectFull | PlaylistObjectFull> {
  const { data } = await spotify.get(removeLeadingUrl(href))
  return data
}

export async function getRecentlyPlayed() {
  let lastContext = ''
  const { data } = await spotify.get('/me/player/recently-played?limit=50')
  const items = data.items.reduce(
    (acc: RecentContext[], item: PlayHistoryObject) => {
      if (item.context.uri !== lastContext) {
        acc.push({
          context: {
            name: item.context.href,
            image: '',
          },
          tracks: [{ ...item.track, playedAt: item.played_at }],
        })
        lastContext = item.context.uri
      } else {
        acc[acc.length - 1].tracks.push({
          ...item.track,
          playedAt: item.played_at,
        })
      }
      return acc
    },
    []
  )

  const fulfilledItems: RecentContext[] = await Promise.all(
    items.map(async (item: RecentContext) => {
      const context = await getItemFromUri(item.context.name)
      return {
        context: {
          name: context.name,
          image: context.images[0].url,
        },
        tracks: [...item.tracks],
      }
    })
  )
  return fulfilledItems
}
