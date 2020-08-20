import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'
import { logoutAction } from '../actions'
import { Question } from '../types/question'

interface RoundState {
  playerNames: string[]
  locked: boolean
  questions: Question[]
}

const initialState: RoundState = {
  playerNames: [],
  locked: false,
  questions: [],
}

interface ApiResponse {
  player_names: string[]
  questions: Question[]
  round_id: number
  locked: boolean
}

export const round = createSlice({
  name: 'round',
  initialState,
  reducers: {
    setData: (state: RoundState, action: PayloadAction<ApiResponse>) => {
      const { player_names: playerNames, questions, locked } = action.payload
      state.playerNames = playerNames
      state.questions = questions
      state.locked = locked
    },
  },
  extraReducers: {
    [logoutAction.toString()]: (state: RoundState) => {
      state.playerNames = []
    },
  },
})

const getRound = (state: State) => state.round

export const roundSelectors = {
  getRound,
}
