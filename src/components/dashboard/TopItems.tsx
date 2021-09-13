import { useState, useEffect } from 'react'
import { getTopItems, topTimelines } from 'api/spotify'
import { ArtistObjectFull, TrackObjectFull } from 'types/spotify'
import { FiveColumnGrid } from 'elements/containers'
import { TopTrack } from './TopItem'

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
  const [items, setItems] = useState<TopArray>([])
  const [timeline, setTimeline] = useState<topTimelines>('medium_term')

  useEffect(() => {
    getTopItems(itemType, timeline).then((res: TopArray) => {
      setItems(res)
    })
  }, [timeline])
  return (
    <div style={{ height: '300px', overflow: 'auto', width: '50%' }}>
      <select
        value={timeline}
        onChange={(e) => setTimeline(e.target.value as topTimelines)}
      >
        {timelineOptions.map((e) => (
          <option value={e.value}>{e.text} </option>
        ))}
      </select>
      <FiveColumnGrid>
        {items.map((t, i) => {
          return <TopTrack item={t} ranking={i + 1} />
        })}
      </FiveColumnGrid>
    </div>
  )
}
