import styled from 'styled-components'
import { spotifyGreen } from './colors'

export const Select = styled.select`
  border: none;
  border-bottom: 1px solid ${spotifyGreen};
  background: transparent;
  color: #fff;
  padding: 5px;
`

export const Option = styled.option`
  background: #0d0c0c;
  color: #fff;
  padding: 5px;
`
