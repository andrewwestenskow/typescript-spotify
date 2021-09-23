import styled from 'styled-components'
import { TabComponent } from './types'
import { TabList as DefaultTabList } from 'react-tabs'
import { spotifyGreen } from 'elements/colors'

const TabListDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 8px;
  position: relative;
  background-color: #0d0c0c;
`

interface SelectedProps {
  offset: number
}

const SelectedTabDiv = styled.div<SelectedProps>`
  background: ${spotifyGreen};
  position: absolute;
  top: 0;
  left: ${(props) => props.offset * 100 + props.offset * 0}px;
  border-radius: 8px;
  width: 100px;
  height: 100%;
  transition: all 500ms;
  opacity: 0.8;
`

interface Props {
  selectedIndex: number
}

export const TabList: TabComponent<Props> = ({ children, selectedIndex }) => {
  return (
    <DefaultTabList>
      <TabListDiv>
        {children}
        <SelectedTabDiv offset={selectedIndex} />
      </TabListDiv>
    </DefaultTabList>
  )
}

TabList.tabsRole = 'TabList'
