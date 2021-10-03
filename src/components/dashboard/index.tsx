import { UserPlaylists } from './Playlists'
import { TopItems } from './TopItems'
import { DashboardContainer } from 'elements/containers'
import { Row } from 'elements/containers'
import { ContextWrapper } from './context'
import { TabPanel, Tabs } from 'react-tabs'
import { TabList, Tab } from './tabs'
import { useState } from 'react'
import { LibraryAlbums } from 'components/library/Albums'

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <DashboardContainer>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
      >
        {/*TAB HEADER*/}
        <Row style={{ justifyContent: 'center' }}>
          <TabList selectedIndex={selectedTab}>
            <Tab>Home</Tab>
            <Tab>Top</Tab>
            <Tab>Library</Tab>
          </TabList>
        </Row>

        {/* HOME TAB*/}
        <TabPanel>HOME</TabPanel>
        {/*TOP TAB*/}
        <TabPanel>
          <Row>
            <TopItems itemType="tracks" />
            <TopItems itemType="artists" />
          </Row>
        </TabPanel>
        {/*LIBRARY TAB*/}
        <TabPanel>
          <UserPlaylists />
          <LibraryAlbums />
        </TabPanel>
      </Tabs>
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
