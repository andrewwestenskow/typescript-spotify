import { AlbumCover } from 'elements/images'
import { Title } from 'elements/text'
import { ArtistObjectFull, TrackObjectFull } from 'types/spotify'

interface Props {
  item: TrackObjectFull | ArtistObjectFull
  ranking: number
}

function isTrack(
  item: TrackObjectFull | ArtistObjectFull
): item is TrackObjectFull {
  return !!item.hasOwnProperty('album')
}

export const TopTrack = (props: Props) => {
  const { item, ranking } = props

  const isItemTrack = isTrack(item)

  if (isItemTrack) {
    return (
      <div>
        <Title>#{ranking}</Title>
        <AlbumCover size="medium" src={item.album.images[0].url} />
        <Title>{item.name}</Title>
        <Title>{item.artists[0].name}</Title>
      </div>
    )
  } else {
    return (
      <div>
        <Title>#{ranking}</Title>
        <AlbumCover size="medium" src={item.images[0].url} />
        <Title>{item.name}</Title>
      </div>
    )
  }
}
