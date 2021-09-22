import { Truncate } from 'elements/text'
import { ArtistObjectFull, TrackObjectFull } from 'types/spotify'
import { HoverPlay } from 'components/widgets/HoverPlay'
import styled from 'styled-components'

const TopItemDiv = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  background-size: contain;
  margin: 5px;
  position: relative;
  padding: 5px;
`

const Ranking = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
`

const TopTitle = styled(Truncate)`
  font-size: 18px;
  font-weight: 700;
`

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
      <TopItemDiv
        style={{ backgroundImage: `url(${item.album.images[0].url})` }}
      >
        <Ranking>#{ranking}</Ranking>
        <TopTitle>{item.name}</TopTitle>
        <TopTitle>{item.artists[0].name}</TopTitle>
        <HoverPlay context={item.album.uri} offset={item.uri} />
      </TopItemDiv>
    )
  } else {
    return (
      <TopItemDiv style={{ backgroundImage: `url(${item.images[0].url})` }}>
        <Ranking>#{ranking}</Ranking>
        <TopTitle>{item.name}</TopTitle>
        <HoverPlay context={item.uri} />
      </TopItemDiv>
    )
  }
}
