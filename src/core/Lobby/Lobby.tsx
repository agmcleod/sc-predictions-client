import React, { FC, useEffect, useState } from 'react'

import { FormError } from 'common/components/FormError'
import { Player } from 'common/store/types/player'

const JOIN_URL = `${process.env.REACT_APP_HOST}/join`

interface LobbyProps {
  gameId: number
  getPlayers: (gameId: number, setError: (msg: string) => void) => void
  players: Player[]
}

export const Lobby: FC<LobbyProps> = ({ gameId, getPlayers, players }) => {
  const [error, setError] = useState('')
  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers(gameId, setError)
    }, 5000)

    return () => clearInterval(interval)
  }, [getPlayers, gameId])

  return (
    <div>
      <h1>Game ID: {gameId}</h1>
      <p>
        Tell your players the Game ID, and to join at:{' '}
        <a href={JOIN_URL}>{JOIN_URL}</a>
      </p>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.user_name}</li>
        ))}
      </ul>
      <FormError errorMsg={error} />
    </div>
  )
}
