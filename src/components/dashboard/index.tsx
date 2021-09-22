import { UserPlaylists } from './Playlists'
import { TopItems } from './TopItems'
import { DashboardContainer } from 'elements/containers'
import { Row } from 'elements/containers'
import { ContextWrapper } from './context'

const Dashboard = () => {
  return (
    <DashboardContainer>
      <UserPlaylists />
      <Row>
        <TopItems itemType="tracks" />
        <TopItems itemType="artists" />
      </Row>
    </DashboardContainer>
  )
}

const DashboardWithContext = () => {
  return (
    <ContextWrapper>
      <Dashboard />
    </ContextWrapper>
  )
}

export default DashboardWithContext
