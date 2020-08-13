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
  getGameStatus: (gameId: number, setError: (msg: string) => void) => void
  gameSlug: string
  hasOpenRound: boolean
  players: Player[]
  role: Role
}

export const Lobby: FC<LobbyProps> = ({
  gameId,
  getPlayers,
  getGameStatus,
  gameSlug,
  hasOpenRound,
  players,
  role,
}) => {
  const [error, setError] = useState('')
  const history = useHistory()
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
          <Button onClick={() => history.push('/round')}>Start a Round</Button>
        </>
      ) : null}
    </div>
  )
}
