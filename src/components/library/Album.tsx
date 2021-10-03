import { AlbumObjectFull } from 'types/spotify'
import { AlbumCover } from 'elements/images'

interface Props {
  item: AlbumObjectFull
}

export const Album = (props: Props) => {
  const { item } = props
  return <AlbumCover src={item.images[0].url} size="large" />
}
