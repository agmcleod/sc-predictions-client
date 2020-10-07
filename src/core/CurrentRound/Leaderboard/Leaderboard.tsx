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
  setPicksChosen: (value: boolean) => void
  players: Player[]
  role: Role | null
}

export const Leaderboard: FC<LeaderboardProps> = ({
  gameId,
  getGameStatus,
  getPlayers,
  getRoundStatus,
  players,
  role,
  setPicksChosen,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getPlayers(gameId, setError)
  }, [gameId, getPlayers])

  // TODO: bit of a unclean solution, clears that the user has chosen their picks
  // potentially ideal to create an endpoint or add this to round status for current user
  useEffect(() => {
    setPicksChosen(false)
  }, [setPicksChosen])

  useEffect(() => {
    getRoundStatus(setError)
    getGameStatus(setError)
    // then setup polling
    const interval = setInterval(() => {
      getRoundStatus(setError)
      getGameStatus(setError)
    }, 5000)

    return () => clearInterval(interval)
  }, [getRoundStatus, getGameStatus])

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
