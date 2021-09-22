import { useReducer, createContext, useContext, Dispatch } from 'react'
import { ArtistObjectFull, TrackObjectFull } from 'types/spotify'

const initialState = {
  topTracks: [] as TrackObjectFull[],
  topArtists: [] as ArtistObjectFull[],
}

const DashboardContext = createContext({
  state: initialState,
  dispatch: (() => null) as Dispatch<DashboardAction>,
})

type DashboardActions = 'TOP_TRACKS' | 'TOP_ARTISTS'

type DashboardAction = {
  type: DashboardActions
  payload: any
}

const dashboardReducer = (
  state: typeof initialState,
  action: DashboardAction
) => {
  switch (action.type) {
    case 'TOP_ARTISTS': {
      return { ...state, topArtists: action.payload }
    }
    case 'TOP_TRACKS': {
      return { ...state, topTracks: action.payload }
    }
    default:
      throw new Error()
  }
}

export const ContextWrapper: React.FC = (props) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  return context
}
