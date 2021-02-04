interface WebsocketState {
  client: WebSocket | null
}

const state: WebsocketState = {
  client: null,
}

export const createWSConnection = (): WebSocket => {
  return new WebSocket(process.env.REACT_APP_WS_URL || '')
}

export const getClient = (): WebSocket => {
  if (state.client === null) {
    state.client = createWSConnection()
  }

  return state.client
}

export const closeConnection = () => {
  if (state.client) {
    state.client.close()
    state.client = null
  }
}
