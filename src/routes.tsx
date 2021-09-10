import Login from 'components/Login'
import HandleCallback from 'components/HandleCallback'
import Dashboard from 'components/dashboard'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'elements/containers'
import { Player } from 'components/player'
import { RecentlyPlayed } from 'components/recent'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/callback" component={HandleCallback} />
    <Route
      path="/spotify"
      render={() => {
        return (
          <>
            <Container>
              <Switch>
                <Route exact path="/spotify/dashboard" component={Dashboard} />
              </Switch>
              <RecentlyPlayed />
            </Container>
            <Player />
          </>
        )
      }}
    />
  </Switch>
)
