import { Sidebar } from 'elements/containers'
import { useState, useEffect, Fragment } from 'react'
import { getRecentlyPlayed } from 'api/spotify'
import { RecentContext } from 'types/spotify'
import { AlbumCover } from 'elements/images'
import { Title } from 'elements/text'
import { Row } from 'elements/containers'

export const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentContext[]>([])

  useEffect(() => {
    getRecentlyPlayed().then((list) => setRecentlyPlayed(list))
  }, [])

  return (
    <Sidebar>
      {recentlyPlayed.map((context, i) => {
        return (
          <Fragment key={context.context.id}>
            <Row style={{ padding: '10px' }}>
              <AlbumCover size="small" src={context.context.image} />
              <Title>{context.context.name}</Title>
            </Row>
            {context.tracks.map((track) => {
              return <Title key={track.id}>{track.name}</Title>
            })}
          </Fragment>
        )
      })}
    </Sidebar>
  )
}
