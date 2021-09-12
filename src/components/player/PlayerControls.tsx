interface Props {
  player: Spotify.Player | null
}

export const PlayerControls = (props: Props) => {
  const { player } = props
  return (
    <div>
      {player ? (
        <div>
          <button onClick={() => player.togglePlay()}>Play/Pause</button>
          <button onClick={() => player.nextTrack()}>Next</button>
          <button onClick={() => player.previousTrack()}>Prev</button>
        </div>
      ) : (
        <p>Nothing playing</p>
      )}
    </div>
  )
}
