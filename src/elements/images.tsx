import styled from 'styled-components'

interface AlbumCoverProps {
  size?: 'small' | 'medium' | 'large' | 'teenie'
}

export const AlbumCover = styled.img<AlbumCoverProps>`
  height: ${(props) => {
    switch (props.size) {
      case 'teenie':
        return '25px'
      case 'small':
        return '50px'
      case 'medium':
        return '100px'
      case 'large':
        return '150px'
      default:
        return '100px'
    }
  }};
`
