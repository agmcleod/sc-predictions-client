import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../index'

interface CurrentUserState {
  uuid: string
  accessToken: string
}

const initialState: CurrentUserState = {
  uuid: '',
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
    setUUID: (state: CurrentUserState, action: PayloadAction<string>) => {
      state.uuid = action.payload
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
