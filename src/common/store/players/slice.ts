import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'
import { Player } from '../types/player'

interface PlayerState {
  players: Player[]
}

const initialState: PlayerState = {
  players: [],
}

export const players = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state: PlayerState, action: PayloadAction<Player[]>) => {
      state.players = action.payload
    },
  },
})

export const playersSelectors = {
  getPlayers: (state: State) => state.players.players,
}
