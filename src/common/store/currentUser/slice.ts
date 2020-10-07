import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import decode from 'jwt-decode'

import { State } from '../index'
import { logoutAction } from '../actions'
import { TokenData } from '../types/tokenData'

interface CurrentUserState {
  accessToken: string
}

const initialState: CurrentUserState = {
  accessToken: '',
}

export const currentUser = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setAccessToken: (
      state: CurrentUserState,
      action: PayloadAction<string>,
    ) => {
      state.accessToken = action.payload
    },
  },
  extraReducers: {
    [logoutAction.toString()]: (state: CurrentUserState) => {
      state.accessToken = ''
    },
  },
})

const getAccessToken = createSelector(
  (state: State) => state.currentUser.accessToken,
  (accessToken) => accessToken,
)

const getTokenData = createSelector(
  getAccessToken,
  (accessToken: string): TokenData | null => {
    if (accessToken) {
      try {
        return decode(accessToken)
      } catch (err) {
        return null
      }
    }

    return null
  },
)

// fallback is not a valid ID, but endpoints using it will 401 anyways, due to no token
const getGameId = createSelector(getTokenData, (data: TokenData | null) => {
  return data ? data.game_id : 0
})

const getRole = createSelector(getTokenData, (data: TokenData | null) => {
  return data ? data.role : null
})

export const currentUserSelectors = {
  getAccessToken,
  getTokenData,
  getGameId,
  getRole,
}
