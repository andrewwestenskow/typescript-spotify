import { useState, useEffect } from 'react'
import { getUserTopTracks, topTimelines } from 'api/spotify'
import { TrackObjectFull } from 'types/spotify'
import { Title } from 'elements/text'

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

export const TopUserTracks = () => {
  const [tracks, setTracks] = useState<TrackObjectFull[]>([])
  const [timeline, setTimeline] = useState<topTimelines>('medium_term')

  useEffect(() => {
    getUserTopTracks(timeline).then((res) => {
      setTracks(res)
    })
  }, [timeline])
  return (
    <div>
      <select
        value={timeline}
        onChange={(e) => setTimeline(e.target.value as topTimelines)}
      >
        {timelineOptions.map((e) => (
          <option value={e.value}>{e.text} </option>
        ))}
      </select>
      {tracks.map((t) => {
        return <Title>{t.name}</Title>
      })}
    </div>
  )
}
