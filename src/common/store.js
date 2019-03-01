import { combineReducers } from 'redux'
import { configureStore } from 'redux-starter-kit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { currentUser } from './currentUser'

const rootReducer = combineReducers({
  currentUser: currentUser.reducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)
