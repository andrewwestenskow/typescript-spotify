import { useState, useEffect } from 'react'
import { getTopItems, topTimelines } from 'api/spotify'
import { ArtistObjectFull, TrackObjectFull } from 'types/spotify'
import { FlexWrap } from 'elements/containers'
import { TopTrack } from './TopItem'
import { Select, Option } from 'elements/inputs'
import styled from 'styled-components'
import { useDashboardContext } from './context'

const TopItemsDiv = styled.div`
  overflow: auto;
  width: 50%;
  padding: 10px;
`

const timelineOptions = [
  {
    text: 'All Time',
    value: 'long_term',
  },
  {
    text: 'Last 6 Months',
    value: 'medium_term',
  },
  {
    text: 'Last 4 Weeks',
    value: 'short_term',
  },
]

interface Props {
  itemType: 'artists' | 'tracks'
}

export type TopArray = TrackObjectFull[] | ArtistObjectFull[]

export const TopItems = (props: Props) => {
  const { itemType } = props
  const {
    state: { topTracks, topArtists },
    dispatch,
  } = useDashboardContext()

  const [timeline, setTimeline] = useState<topTimelines>('medium_term')

  useEffect(() => {
    getTopItems(itemType, timeline).then((res: TopArray) => {
      if (itemType === 'artists') {
        dispatch({ type: 'TOP_ARTISTS', payload: res })
      } else {
        dispatch({ type: 'TOP_TRACKS', payload: res })
      }
    })
  }, [timeline, itemType, dispatch])

  const items = itemType === 'artists' ? topArtists : topTracks

  return (
    <TopItemsDiv>
      <Select
        value={timeline}
        onChange={(e) => setTimeline(e.target.value as topTimelines)}
      >
        {timelineOptions.map((e) => (
          <Option value={e.value}>{e.text} </Option>
        ))}
      </Select>
      <FlexWrap>
        {items.map((t, i) => {
          return <TopTrack item={t} ranking={i + 1} />
        })}
      </FlexWrap>
    </TopItemsDiv>
  )
}
