import { AlbumObjectFull } from 'types/spotify'
import { AlbumCover } from 'elements/images'
import styled from 'styled-components'

interface Props {
  item: AlbumObjectFull
}

const AlbumDiv = styled.div`
  margin: 5px;
`

export const Album = (props: Props) => {
  const { item } = props
  return (
    <AlbumDiv>
      <AlbumCover src={item.images[0].url} size="large" />
    </AlbumDiv>
  )
}
