import axios from 'axios'

export const local = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const ajax = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

export const setAuth = (accessToken: string, refreshToken: string) => {
  ajax.interceptors.request.use(
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
