import { PlayButton } from 'assets/play-button'
import { play } from 'api/spotify'
import styled from 'styled-components'

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  position: absolute;
  transition: all 0.5s;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.3);
  :hover {
    opacity: 100;
  }
  > svg {
    width: 25%;
  }
`

interface Props {
  context?: string
  uris?: string[]
  offset?: string
}

export const HoverPlay = (props: Props) => {
  const { context, uris, offset } = props

  const handlePlay = () => {
    play({ context, uris, offset })
  }

  return (
    <Div>
      <PlayButton onClick={handlePlay} />
    </Div>
  )
}
