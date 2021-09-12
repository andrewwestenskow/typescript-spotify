import { useEffect, useState } from 'react'
import { getUserPlaylists } from 'api/spotify'
import { PlaylistObjectSimplified } from 'types/spotify'
import { DashboardRow } from 'elements/containers'
import { AlbumCover } from 'elements/images'
import { Title } from 'elements/text'

export const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([])
  useEffect(() => {
    getUserPlaylists().then((res) => {
      setPlaylists(res)
    })
  }, [])

  return (
    <DashboardRow>
      {playlists.map((p) => {
        return (
          <div key={p.id}>
            <AlbumCover size="medium" src={p.images[0].url} />
            <Title>{p.name}</Title>
          </div>
        )
      })}
    </DashboardRow>
  )
}
