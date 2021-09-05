import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import routes from './routes'
import { checkSession, setAuth } from 'api'

class App extends Component<RouteComponentProps> {
  componentDidMount() {
    checkSession().then((res) => {
      setAuth(res.data.tokens.access_token, res.data.tokens.refresh_token)
    })
  }
  render() {
    return <div>{routes}</div>
  }
}
export default withRouter(App)
