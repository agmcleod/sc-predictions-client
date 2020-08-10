import React, { FC, useEffect, useState } from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { FormError } from 'common/components/FormError'
import { Player } from 'common/store/types/player'

const JOIN_URL = `${process.env.REACT_APP_HOST}/join`

interface LobbyProps {
  gameId: number
  getPlayers: (gameId: number, setError: (msg: string) => void) => void
  getGameStatus: (gameId: number, setError: (msg: string) => void) => void
  gameSlug: string
  players: Player[]
}

export const Lobby: FC<LobbyProps> = ({
  gameId,
  getPlayers,
  getGameStatus,
  gameSlug,
  players,
}) => {
  const [error, setError] = useState('')
  useEffect(() => {
    // get players once
    getPlayers(gameId, setError)
    getGameStatus(gameId, setError)
    // then setup polling
    const interval = setInterval(() => {
      getPlayers(gameId, setError)
      getGameStatus(gameId, setError)
    }, 5000)

    return () => clearInterval(interval)
  }, [getPlayers, getGameStatus, gameId])

  return (
    <div>
      <Typography variant='h1'>Game code: {gameSlug}</Typography>
      <Typography>
        Tell your players the game code, and to join at:{' '}
        <Link href={JOIN_URL}>{JOIN_URL}</Link>
      </Typography>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.user_name}</li>
        ))}
      </ul>
      <FormError errorMsg={error} />
    </div>
  )
}
