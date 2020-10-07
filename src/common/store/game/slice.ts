import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'
import { logoutAction } from '../actions'

interface GameState {
  slug: string
  open_round: boolean
  unfinished_round: boolean
}

const initialState: GameState = {
  slug: '',
  open_round: false,
  unfinished_round: false,
}

interface SetGameStatusPayload {
  slug: string
  open_round: boolean
  unfinished_round: boolean
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameStatus: (
      state: GameState,
      action: PayloadAction<SetGameStatusPayload>,
    ) => {
      state.slug = action.payload.slug
      state.open_round = action.payload.open_round
      state.unfinished_round = action.payload.unfinished_round
    },
    setOpenRound: (state: GameState, action: PayloadAction<boolean>) => {
      state.open_round = action.payload
    },
  },
  extraReducers: {
    [logoutAction.toString()]: (state: GameState) => {
      return {
        ...initialState,
      }
    },
  },
})

export const gameSelectors = {
  getSlug: (state: State) => state.game.slug,
  hasOpenRound: (state: State) => state.game.open_round,
  hasUnfinishedRound: (state: State) => state.game.open_round,
}
