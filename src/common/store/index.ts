import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { currentUser } from './currentUser'
import { game } from './game'
import { players } from './players'
import { round } from './round'
import { tokenMiddleware } from './tokenMiddleware'

const rootReducer = combineReducers({
  currentUser: currentUser.reducer,
  game: game.reducer,
  players: players.reducer,
  round: round.reducer,
})

export type State = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware<State>(), tokenMiddleware, thunk],
})

export const persistor = persistStore(store)
