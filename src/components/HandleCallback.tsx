import { Component } from 'react'
import { setAuth, callback } from 'api'
import { withRouter, RouteComponentProps } from 'react-router-dom'

class HandleCallback extends Component<RouteComponentProps> {
  componentDidMount() {
    const urlQuery = new URLSearchParams(this.props.location.search)
    const code = urlQuery.get('code')
    if (code) {
      callback(code).then((res) => {
        setAuth(res.data.access_token, res.data.refresh_token)
        this.props.history.push('/spotify/dashboard')
      })
    }
  }

  render() {
    return <div></div>
  }
}
export default withRouter(HandleCallback)
