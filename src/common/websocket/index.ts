export const createWSConnection = (): WebSocket => {
  return new WebSocket(process.env.REACT_APP_WS_URL || '')
}
