import { UserPlaylists } from './Playlists'
import { TopItems } from './TopItems'
import { DashboardContainer } from 'elements/containers'
import { Row } from 'elements/containers'

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
export default Dashboard
