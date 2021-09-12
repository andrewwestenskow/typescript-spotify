import { checkSession } from 'api'
import { useState, useEffect } from 'react'
import { setDeviceId } from 'api'

const useSpotifyPlayer = () => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null)

  useEffect(() => {
    if (Spotify && !player) {
      checkSession().then((res) => {
        const { access_token: token } = res.data.tokens
        const player = new Spotify.Player({
          name: 'Carve V2',
          getOAuthToken: (cb) => {
            cb(token)
          },
          volume: 1,
        })

        player.connect()

        player.on('ready', (data) => {
          setDeviceId(data.device_id)
        })

        setPlayer(player)
      })
    }
  }, [player])

  return player
}

export default useSpotifyPlayer
