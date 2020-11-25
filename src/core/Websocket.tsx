import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { websocket } from 'common/store/websocket'
import { closeConnection, getClient } from 'common/websocket'

interface WebsocketProps {
  setConnected: (value: boolean) => void
}

const WebsocketComp: FC<WebsocketProps> = ({ setConnected }) => {
  const [client, setClient] = useState<WebSocket | null>(getClient())

  useEffect(() => {
    if (client === null) {
      setClient(getClient())
    } else {
      client.onopen = () => {
        setConnected(true)
        console.log('connected')
      }

      client.onerror = (e) => {
        console.log('errored', e)
        setConnected(false)
        closeConnection()
        setClient(null)
      }
    }
  }, [client, setConnected])

  // ensure we close connection when this component unmounts
  useEffect(() => {
    return () => closeConnection()
  }, [])

  return null
}

export const Websocket = connect(null, {
  setConnected: websocket.actions.setConnected,
})(WebsocketComp)
