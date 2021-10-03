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
 * {@link getTopItems}
 * {@link play}
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

/**
 * Get library albums
 */

export async function getLibraryAlbums(length: number) {
  let albums: AlbumObjectFull[] = []

  let url = 'https://api.spotify.com/v1/me/albums?limit=50'

  while (!!url) {
    const {
      data: { next, items, total },
    } = await spotify.request.get(removeLeadingUrl(url))
    if (total === length) {
      return false
    }
    albums = [
      ...albums,
      ...items.map((e: { album: AlbumObjectFull }) => e.album),
    ]
    url = next
  }

  return albums
}

/**
 * PLAYBACK
 */

interface PlayConfig {
  context?: string
  uris?: string[]
  offset?: string
}

export async function play(config: PlayConfig) {
  const { context, uris, offset } = config
  if (spotify.deviceId) {
    if (offset) {
      return await spotify.request.put(
        `/me/player/play?device_id=${spotify.deviceId}`,
        { context_uri: context, offset: { uri: offset } }
      )
    }
    if (uris) {
      return await spotify.request.put(
        `/me/player/play?device_id=${spotify.deviceId}`,
        { uris }
      )
    }
    return await spotify.request.put(
      `/me/player/play?device_id=${spotify.deviceId}`,
      { context_uri: context }
    )
  } else {
    return await spotify.request.put(`/me/player/play`, {
      context_uri: context,
      uris,
    })
  }
}
