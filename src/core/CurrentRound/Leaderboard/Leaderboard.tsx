import React, { FC, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'

import { Player } from 'common/store/types/player'
import { FormError } from 'common/components/FormError'

interface LeaderboardProps {
  gameId: number
  getPlayers: (gameId: number, setError: (msg: string) => void) => void
  players: Player[]
}

export const Leaderboard: FC<LeaderboardProps> = ({
  gameId,
  getPlayers,
  players,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getPlayers(gameId, setError)
  }, [gameId, getPlayers])

  return (
    <div>
      <Typography variant='h1'>Leaderboard</Typography>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.user_name}</li>
        ))}
      </ul>
      <FormError errorMsg={error} />
    </div>
  )
}
