import React, { FC, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'

import { Player } from 'common/store/types/player'
import { Role } from 'common/store/types/tokenData'
import { Link } from 'common/components/Link'
import { FormError } from 'common/components/FormError'

interface LeaderboardProps {
  gameId: number
  getGameStatus: (setError: (msg: string) => void) => void
  getPlayers: (gameId: number, setError: (msg: string) => void) => void
  getRoundStatus: (setError: (msg: string) => void) => void
  isConnected: boolean
  players: Player[]
  role: Role | null
}

export const Leaderboard: FC<LeaderboardProps> = ({
  gameId,
  getGameStatus,
  getPlayers,
  getRoundStatus,
  isConnected,
  players,
  role,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getPlayers(gameId, setError)
  }, [gameId, getPlayers])

  useEffect(() => {
    getRoundStatus(setError)
    getGameStatus(setError)

    let interval: null | number = null
    if (!isConnected) {
      interval = setInterval(() => {
        getRoundStatus(setError)
        getGameStatus(setError)
      }, 5000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [getRoundStatus, getGameStatus, isConnected])

  return (
    <div>
      <Typography variant='h1'>Leaderboard</Typography>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.user_name} - {player.score}
          </li>
        ))}
      </ul>
      <FormError errorMsg={error} />
      {role === Role.Owner ? (
        <Link href='/create-round'>Start a new round</Link>
      ) : null}
    </div>
  )
}
