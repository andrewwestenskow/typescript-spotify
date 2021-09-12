import axios, { AxiosInstance } from 'axios'

interface SpotifyRequestType {
  request: AxiosInstance
  accessToken: string
  refreshToken: string
  deviceId: string
}

export const local = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const spotify: SpotifyRequestType = {
  request: axios.create({ baseURL: 'https://api.spotify.com/v1' }),
  accessToken: '',
  refreshToken: '',
  deviceId: '',
}

export const setAuth = (accessToken: string, refreshToken: string) => {
  spotify.request.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
      return config
    },
    (error) => {
      console.log(error)
      Promise.reject(error)
    }
  )
  spotify.accessToken = accessToken
  spotify.refreshToken = refreshToken
}

export const setDeviceId = (deviceId: string) => {
  spotify.deviceId = deviceId
}

export const login = () => {
  local.get('/login').then((res) => {
    window.location.href = res.data
  })
}

export const callback = (code: string) => {
  return local.post(`/callback?code=${code}`)
}

export const checkSession = () => {
  return local.get('/session')
}

export const getToken = () => {
  return local.get('/token')
}
