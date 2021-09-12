import { PlayerContainer } from 'elements/containers'
import useSpotifyPlayer from 'hooks/useSpotifyPlayer'
import { useEffect, useState } from 'react'
import SongInformation from './SongInformation'
import { PlayerControls } from './PlayerControls'

export const Player = () => {
  const player = useSpotifyPlayer()
  const [playerState, setPlayerState] = useState<Spotify.PlaybackState | null>(
    null
  )

  useEffect(() => {
    if (player) {
      player.getCurrentState().then((state) => {
        setPlayerState(state)
      })
      player.on('player_state_changed', (state) => {
        setPlayerState(state)
      })
    }
  }, [player])

  return (
    <PlayerContainer>
      <SongInformation song={playerState?.track_window.current_track} />
      <PlayerControls player={player} />
    </PlayerContainer>
  )
}
