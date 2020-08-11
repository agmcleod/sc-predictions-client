import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'
import { logoutAction } from '../actions'

interface RoundState {
  playerOne: string
  playerTwo: string
}

const initialState: RoundState = {
  playerOne: '',
  playerTwo: '',
}

interface SetPlayersAction {
  playerOne: string
  playerTwo: string
}

export const round = createSlice({
  name: 'round',
  initialState,
  reducers: {
    setPlayers: (
      state: RoundState,
      action: PayloadAction<SetPlayersAction>,
    ) => {
      state.playerOne = action.payload.playerOne
      state.playerTwo = action.payload.playerTwo
    },
  },
  extraReducers: {
    [logoutAction.toString()]: (state: RoundState) => {
      state.playerOne = ''
      state.playerTwo = ''
    },
  },
})

const getRound = (state: State) => state.round

const getPlayers = createSelector(getRound, (round: RoundState) => {
  const { playerOne, playerTwo } = round
  return {
    playerOne,
    playerTwo,
  }
})

export const roundSelectors = {
  getPlayers,
}
