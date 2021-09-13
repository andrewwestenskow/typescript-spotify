import { spotify } from './index'
import {
  AlbumObjectFull,
  ArtistObjectFull,
  PlayHistoryObject,
  PlaylistObjectFull,
  PlaylistObjectSimplified,
  RecentContext,
  TrackObjectFull,
} from 'types/spotify'
import { removeLeadingUrl } from 'utils/removeLeadingUrl'

/************************************************************************************
 * TABLE OF CONTENTS (CTRL + Click to jump to function)
 * {@link getItemFromUri}
 * {@link getRecentlyPlayed}
 * {@link getUserPlaylists}
 * {@link getTopITems}
 */

/**
 * Fetches album/artist/playlist based on Spotify URI
 * @param href Spotify URI
 * @returns Item
 */
export async function getItemFromUri(
  href: string
): Promise<AlbumObjectFull | ArtistObjectFull | PlaylistObjectFull> {
  const { data } = await spotify.request.get(removeLeadingUrl(href))
  return data
}

/**
 * Gets recently played items and formats them in a nested context > track structure
 * @returns {RecentContext[]}
 */
export async function getRecentlyPlayed() {
  let lastContext = ''
  const { data } = await spotify.request.get(
    '/me/player/recently-played?limit=50'
  )
  const items = data.items.reduce(
    (acc: RecentContext[], item: PlayHistoryObject) => {
      if (item.context.uri !== lastContext) {
        acc.push({
          context: {
            name: item.context.href,
            image: '',
            href: '',
            id: '',
            uri: '',
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
          href: context.href,
          id: context.id,
          uri: context.uri,
        },
        tracks: [...item.tracks],
      }
    })
  )
  return fulfilledItems
}

export async function getUserPlaylists(): Promise<PlaylistObjectSimplified[]> {
  const { data } = await spotify.request.get('/me/playlists')
  return data.items
}

export type topTimelines = 'long_term' | 'medium_term' | 'short_term'

/**
 * Get top tracks or artists
 * @param timeline
 * @returns
 */
export async function getTopItems(
  itemType: 'artists' | 'tracks',
  timeline: topTimelines = 'medium_term'
): Promise<TrackObjectFull[] | ArtistObjectFull[]> {
  const { data } = await spotify.request.get(
    `/me/top/${itemType}?time_range=${timeline}&limit=50`
  )
  return data.items
}
