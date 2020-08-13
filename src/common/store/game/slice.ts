import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'

interface GameState {
  slug: string
  openRound: boolean
}

const initialState: GameState = {
  slug: '',
  openRound: false,
}

interface SetGameStatusPayload {
  slug: string
  openRound: boolean
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
      state.openRound = action.payload.openRound
    },
  },
})

export const gameSelectors = {
  getSlug: (state: State) => state.game.slug,
  hasOpenRound: (state: State) => state.game.openRound,
}
