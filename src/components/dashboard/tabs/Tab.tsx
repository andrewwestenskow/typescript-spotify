import styled from 'styled-components'
import { TabComponent } from './types'
import { Tab as DefaultTab } from 'react-tabs'

const TabDiv = styled.div`
  list-style: none;
  cursor: pointer;
  width: 100px;
  text-align: center;
  color: #fff;
  padding: 10px 20px;
  position: relative;
  z-index: 2;
`

export const Tab: TabComponent = ({ children }) => {
  return (
    <DefaultTab>
      <TabDiv>{children}</TabDiv>
    </DefaultTab>
  )
}

Tab.tabsRole = 'Tab'
