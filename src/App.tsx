import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import routes from './routes'
import { checkSession, setAuth } from 'api'

class App extends Component<RouteComponentProps> {
  state = {
    loading: true,
  }
  componentDidMount() {
    checkSession()
      .then((res) => {
        setAuth(res.data.tokens.access_token, res.data.tokens.refresh_token)
      })
      .catch((err) => {
        // this.props.history.push('/')
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  render() {
    return this.state.loading ? <div>??</div> : <div>{routes}</div>
  }
}
export default withRouter(App)
