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

// TODO: handle failed decode calls.
// Currently sorta handled by routing protecting private screens
const getTokenData = createSelector(
  getAccessToken,
  (accessToken: string): TokenData => {
    return decode(accessToken)
  },
)

const getGameId = createSelector(getTokenData, (data: TokenData) => {
  return data.game_id
})

const getRole = createSelector(getTokenData, (data: TokenData) => {
  return data.role
})

export const currentUserSelectors = {
  getAccessToken,
  getTokenData,
  getGameId,
  getRole,
}
