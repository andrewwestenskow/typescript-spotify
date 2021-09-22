import styled from 'styled-components'

export const Title = styled.p`
  color: white;
`

export const Truncate = styled(Title)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  max-width: 140px;
`
