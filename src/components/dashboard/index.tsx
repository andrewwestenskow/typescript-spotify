import { getRecentlyPlayed } from 'api/spotify'

const Dashboard = () => {
  return (
    <div>
      DASHBOARD!!!!
      <button onClick={getRecentlyPlayed}>GET THE STUFF</button>
    </div>
  )
}
export default Dashboard
