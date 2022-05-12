import { AnyAction, MiddlewareAPI, Dispatch } from 'redux'

import { currentUserSelectors } from './currentUser'

export const tokenMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction): any => {
    const result = next(action)

    const accessToken = currentUserSelectors.getAccessToken(store.getState())
    const storedToken = localStorage.getItem('accessToken')
    if (accessToken && accessToken !== storedToken) {
      localStorage.setItem('accessToken', accessToken)
    } else if (!accessToken && storedToken) {
      localStorage.removeItem('accessToken')
    }

    return result
  }
