import { Sidebar } from 'elements/containers'
import { useState, useEffect } from 'react'
import { getRecentlyPlayed } from 'api/spotify'
import { RecentContext } from 'types/spotify'
import { AlbumCover } from 'elements/images'
import { Title } from 'elements/text'

export const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentContext[]>([])

  useEffect(() => {
    getRecentlyPlayed().then((list) => setRecentlyPlayed(list))
  }, [])

  return (
    <Sidebar>
      {recentlyPlayed.map((context) => {
        return (
          <div>
            <h1>{context.context.name}</h1>
            <AlbumCover src={context.context.image} />
            {context.tracks.map((track) => {
              return <Title>{track.name}</Title>
            })}
          </div>
        )
      })}
    </Sidebar>
  )
}
