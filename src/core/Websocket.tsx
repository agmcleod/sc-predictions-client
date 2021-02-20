import { FC, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'

import { websocket } from 'common/store/websocket'
import { closeConnection, getClient } from 'common/websocket'

interface WebsocketProps {
  setConnected: (value: boolean) => void
}

const WebsocketComp: FC<WebsocketProps> = ({ setConnected }) => {
  useCallback(() => {
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

  // ensure we close connection when this component unmounts
  useEffect(() => {
    return () => closeConnection()
  }, [])

  return null
}

export const Websocket = connect(null, {
  setConnected: websocket.actions.setConnected,
})(WebsocketComp)
