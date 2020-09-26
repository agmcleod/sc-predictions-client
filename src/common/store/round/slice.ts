import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'
import { logoutAction } from '../actions'
import { Question } from '../types/question'
import { UserAnswer } from '../types/userAnswer'

interface RoundState {
  playerNames: string[]
  locked: boolean
  questions: Question[]
  // when a player has chosen their picks
  picksChosen: boolean
  roundPicks: UserAnswer[]
}

const initialState: RoundState = {
  playerNames: [],
  locked: false,
  questions: [],
  picksChosen: false,
  roundPicks: [],
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
    setPicksChosen: (state: RoundState, action: PayloadAction<boolean>) => {
      state.picksChosen = action.payload
    },
    setRoundPicks: (state: RoundState, action: PayloadAction<UserAnswer[]>) => {
      state.roundPicks = action.payload
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
  arePicksChosen: (state: State) => state.round.picksChosen,
  getRoundPicks: (state: State) => state.round.roundPicks,
}
