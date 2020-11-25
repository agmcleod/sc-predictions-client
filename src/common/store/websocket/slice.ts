import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../'

interface WebsocketState {
  connected: boolean
}

const initialState: WebsocketState = {
  connected: false,
}

export const websocket = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnected: (state: WebsocketState, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
  },
})

export const websocketSelectors = {
  isConnected: (state: State) => state.websocket.connected,
}
