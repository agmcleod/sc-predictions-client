import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../index'
import { logoutAction } from '../actions'

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

export const currentUserSelectors = {
  getAccessToken,
}
