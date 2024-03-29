import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { Button } from 'common/components/Button'
import { FormError } from 'common/components/FormError'
import { Player } from 'common/store/types/player'
import { Role } from 'common/store/types/tokenData'

const JOIN_URL = `${process.env.REACT_APP_HOST}/join`

interface LobbyProps {
  gameId: number
  getPlayers: (gameId: number, setError: (msg: string) => void) => void
  getGameStatus: (setError: (msg: string) => void) => void
  gameSlug: string
  hasOpenRound: boolean
  players: Player[]
  role: Role | null
  isConnected: boolean
}

export const Lobby: FC<LobbyProps> = ({
  gameId,
  getPlayers,
  getGameStatus,
  gameSlug,
  hasOpenRound,
  players,
  role,
  isConnected,
}) => {
  const [error, setError] = useState('')
  const history = useHistory()
  useEffect(() => {
    // get players once
    getPlayers(gameId, setError)
    getGameStatus(setError)
    // then setup polling
    let interval: null | NodeJS.Timeout = null
    if (!isConnected) {
      interval = setInterval(() => {
        getPlayers(gameId, setError)
        getGameStatus(setError)
      }, 5000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [getPlayers, getGameStatus, gameId, isConnected])

  useEffect(() => {
    if (hasOpenRound) {
      history.push('/round')
    }
  }, [hasOpenRound, history])

  return (
    <div>
      {role === Role.Owner ? (
        <>
          <Typography variant='h1'>Game code: {gameSlug}</Typography>
          <Typography>
            Tell your players the game code, and to join at:{' '}
            <Link href={JOIN_URL}>{JOIN_URL}</Link>
          </Typography>
        </>
      ) : null}
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.user_name}</li>
        ))}
      </ul>
      <FormError errorMsg={error} />
      {role === Role.Owner ? (
        <>
          <Button onClick={() => history.push('/create-round')}>
            Start a Round
          </Button>
        </>
      ) : null}
    </div>
  )
}
