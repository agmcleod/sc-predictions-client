import { FC, useEffect } from 'react'
import { connect } from 'react-redux'

import { State } from 'common/store'
import { websocket, websocketSelectors } from 'common/store/websocket'
import { currentUserSelectors } from 'common/store/currentUser'
import { closeConnection, getClient, sendMsg } from 'common/websocket'

interface WebsocketProps {
  accessToken: string
  isConnected: boolean
  setConnected: (value: boolean) => void
}

const WebsocketComp: FC<WebsocketProps> = ({ accessToken, isConnected, setConnected }) => {
  useEffect(() => {
    const client = getClient()

    client.onopen = () => {
      setConnected(true)
      console.log('connected')
    }

    client.onmessage = (m) => {
      console.log(m)
    }

    client.onerror = (e) => {
      console.log('errored', e)
      setConnected(false)
      closeConnection()
    }
  }, [setConnected])

  useEffect(() => {
    if (accessToken && isConnected) {
      sendMsg(`/auth ${JSON.stringify({ token: accessToken })}`)
    }
  }, [accessToken, isConnected])

  // ensure we close connection when this component unmounts
  useEffect(() => {
    return () => closeConnection()
  }, [])

  return null
}

export const Websocket = connect((state: State) => ({
  accessToken: currentUserSelectors.getAccessToken(state),
  isConnected: websocketSelectors.isConnected(state)
}), {
  setConnected: websocket.actions.setConnected,

})(WebsocketComp)
