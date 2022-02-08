import { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { State } from 'common/store'
import { websocket, websocketSelectors } from 'common/store/websocket'
import { currentUserSelectors } from 'common/store/currentUser'
import { game } from 'common/store/game'
import { round } from 'common/store/round'
import { players } from 'common/store/players'
import { closeConnection, getClient, sendMsg } from 'common/websocket'

interface WebsocketProps {
  accessToken: string
  handleWebsocketData: (data: WebsocketMsg) => void
  isConnected: boolean
  setConnected: (value: boolean) => void
}

interface WebsocketMsg {
  game_id: number
  data: any
  path: string
}

const WebsocketComp: FC<WebsocketProps> = ({
  accessToken,
  handleWebsocketData,
  isConnected,
  setConnected,
}) => {
  useEffect(() => {
    const client = getClient()

    if (client) {
      client.onopen = () => {
        setConnected(true)
      }

      client.onmessage = (message: MessageEvent) => {
        try {
          const data = JSON.parse(message.data) as WebsocketMsg
          handleWebsocketData(data)
        } catch (err: any) {
          console.error(err)
        }
      }

      client.onerror = (e) => {
        setConnected(false)
        closeConnection()
      }
    }
  }, [setConnected, handleWebsocketData])

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

const handleWebsocketData = (message: WebsocketMsg) => (dispatch: Dispatch) => {
  switch (message.path) {
    case '/players':
      dispatch(players.actions.setPlayers(message.data))
      break
    case '/game-status':
      dispatch(game.actions.setGameStatus(message.data))
      break
    case '/round-status':
      dispatch(round.actions.setData(message.data))
      break
    case '/picks':
      dispatch(round.actions.setRoundPicks(message.data.data))
      dispatch(round.actions.setLocked(message.data.locked))
      break
  }
}

const mapStateToProps = (state: State) => ({
  accessToken: currentUserSelectors.getAccessToken(state),
  isConnected: websocketSelectors.isConnected(state),
})

export const Websocket = connect(mapStateToProps, {
  setConnected: websocket.actions.setConnected,
  handleWebsocketData,
})(WebsocketComp)
