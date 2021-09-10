import styled from 'styled-components'

const playerHeight = 150
const sidebarWidth = 300

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
  height: calc(100vh - ${playerHeight}px);
  overflow-y: auto;
  position: relative;
  padding-right: ${sidebarWidth}px;
`

export const PlayerContainer = styled(BackgroundDown)`
  width: 100vw;
  height: ${playerHeight}px;
`

export const Sidebar = styled(BackgroundDown)`
  width: ${sidebarWidth}px;
  height: calc(100vh - ${playerHeight}px);
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 0;
`
