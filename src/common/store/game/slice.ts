import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'

interface GameState {
  slug: string
}

const initialState: GameState = {
  slug: '',
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameStatus: (state: GameState, action: PayloadAction<string>) => {
      state.slug = action.payload
    },
  },
})

export const gameSelectors = {
  getSlug: (state: State) => state.game.slug,
}
