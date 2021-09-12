import { Title } from 'elements/text'
import { AlbumCover } from 'elements/images'
import { Row } from 'elements/containers'

interface Props {
  song?: Spotify.Track
}

const SongInformation = (props: Props) => {
  const { song } = props
  return (
    <div>
      {song ? (
        <Row>
          <AlbumCover src={song.album.images[0].url} />
          <div>
            <Title>{song.name}</Title>
            <Title>{song.artists[0].name}</Title>
          </div>
        </Row>
      ) : (
        <Title>NOTHING PLAYING</Title>
      )}
    </div>
  )
}
export default SongInformation
