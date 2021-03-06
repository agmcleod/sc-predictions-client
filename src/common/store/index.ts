import { combineReducers, Action } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk, { ThunkDispatch as RTDispatch } from 'redux-thunk'

import { currentUser } from './currentUser'
import { game } from './game'
import { players } from './players'
import { round } from './round'
import { tokenMiddleware } from './tokenMiddleware'
import { websocket } from './websocket'

export const rootReducer = combineReducers({
  currentUser: currentUser.reducer,
  game: game.reducer,
  players: players.reducer,
  round: round.reducer,
  websocket: websocket.reducer,
})

export type State = ReturnType<typeof rootReducer>

export type ThunkDispatch = RTDispatch<State, any, Action>

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['websocket'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware<State>(), tokenMiddleware, thunk],
})

export const persistor = persistStore(store)
