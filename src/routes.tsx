import Login from 'components/Login'
import HandleCallback from 'components/HandleCallback'
import Dashboard from 'components/dashboard'
import { Route, Switch } from 'react-router-dom'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/callback" component={HandleCallback} />
    <Route
      path="/spotify"
      render={() => {
        return (
          <Switch>
            <Route exact path="/spotify/dashboard" component={Dashboard} />
          </Switch>
        )
      }}
    />
  </Switch>
)
