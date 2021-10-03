import { useReducer, createContext, useContext, Dispatch } from 'react'
import {
  AlbumObjectFull,
  ArtistObjectFull,
  TrackObjectFull,
} from 'types/spotify'

export interface AlbumsSection {
  heading: string
  items: AlbumObjectFull[]
}

const initialState = {
  topTracks: [] as TrackObjectFull[],
  topArtists: [] as ArtistObjectFull[],
  albums: {
    count: 0,
    sections: [] as AlbumsSection[],
  },
}

const DashboardContext = createContext({
  state: initialState,
  dispatch: (() => null) as Dispatch<DashboardAction>,
})

type DashboardActions = 'TOP_TRACKS' | 'TOP_ARTISTS' | 'LIBRARY_ALBUMS'

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
    case 'LIBRARY_ALBUMS': {
      return { ...state, albums: action.payload }
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
