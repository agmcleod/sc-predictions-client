import axios from 'axios'

import { store } from './store'
import { currentUserSelectors } from './store/currentUser'
import { logoutAction } from './store/actions'

export const publicApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

publicApi.interceptors.request.use((config) => {
  const token = currentUserSelectors.getAccessToken(store.getState())
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

publicApi.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    const token = currentUserSelectors.getAccessToken(store.getState())
    // if we used a token, log the user out
    if (err.response.status === 401 && token) {
      store.dispatch(logoutAction())
    } else {
      return Promise.reject(err)
    }
  },
)
