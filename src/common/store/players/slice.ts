import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { State } from '../'
import { Player } from '../types/player'
import { logoutAction } from '../actions'

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
  extraReducers: {
    [logoutAction.toString()]: (state: PlayerState) => {
      return {
        players: [],
      }
    },
  },
})

const getPlayers = (state: State) => state.players.players

export const playersSelectors = {
  getPlayers,
  getPlayersSortedByScore: createSelector([getPlayers], (players: Player[]) => {
    const newArr = players.slice(0)
    newArr.sort((a, b) => {
      if (a.score > b.score) {
        return -1
      } else if (a.score < b.score) {
        return 1
      } else {
        return 0
      }
    })

    return newArr
  }),
}
