import styled from 'styled-components'

const playerHeight = 150
const sidebarWidth = 300
const headerHeight = 100

const BackgroundUp = styled.div`
  background: linear-gradient(
    to top,
    #0d0c0c,
    #181717,
    #212121,
    #2a2a2a,
    #343434
  );
`

const BackgroundDown = styled.div`
  background: linear-gradient(
    to bottom,
    #0d0c0c,
    #181717,
    #212121,
    #2a2a2a,
    #343434
  );
`

export const Container = styled(BackgroundUp)`
  width: 100vw;
  height: calc(100vh - ${playerHeight}px - ${headerHeight}px);
  overflow-y: auto;
  position: relative;
`

export const PlayerContainer = styled(BackgroundDown)`
  width: 100vw;
  height: ${playerHeight}px;
  display: flex;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  justify-content: space-evenly;
  border-top: 1px solid #fff;
`

interface SidebarProps {
  isOpen: boolean
}

export const Sidebar = styled(BackgroundDown)<SidebarProps>`
  width: ${sidebarWidth}px;
  height: calc(100vh - ${playerHeight}px);
  overflow-y: auto;
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? 0 : `-${sidebarWidth}px`)};
  top: 0;
  transition: all 500ms;
`

export const Header = styled(BackgroundDown)`
  height: ${headerHeight}px;
  width: 100vw;
`

export const List = styled.div`
  padding: '10px';
`

export const Row = styled.div`
  display: flex;
  align-items: center;
`

export const DashboardRow = styled(Row)`
  width: 100%;
  overflow-x: auto;
  padding: 10px;
`
export const Scroll = styled.div`
  overflow-y: auto;
`

export const DashboardContainer = styled(Scroll)`
  height: calc(100vh - ${playerHeight}px);
`

export const FiveColumnGrid = styled(Scroll)`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  justify-items: center;
`

export const FlexWrap = styled(Scroll)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 10px;
  justify-content: space-evenly;
`
