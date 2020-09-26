import React, { FC, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'

import { FormError } from 'common/components/FormError'
import { Player } from 'common/store/types/player'
import { UserAnswer } from 'common/store/types/userAnswer'
import { PlayerListItem } from './styledComponents'

interface ViewCurrentPicksProps {
  gameId: number
  getPlayers: (gameId: number, setError: (msg: string) => void) => void
  getRoundPicks: (setError: (msg: string) => void) => void
  players: Player[]
  roundPicks: UserAnswer[]
}

export const ViewCurrentPicks: FC<ViewCurrentPicksProps> = ({
  gameId,
  getPlayers,
  getRoundPicks,
  players,
  roundPicks,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getPlayers(gameId, setError)
  }, [gameId, getPlayers])

  useEffect(() => {
    getRoundPicks(setError)
    const interval = setInterval(() => {
      getRoundPicks(setError)
    }, 5000)

    return () => clearInterval(interval)
  }, [getRoundPicks])

  return (
    <>
      <Box mb={2}>
        <Typography variant='h1'>Who has picked</Typography>

        <ul>
          {players.map((player) => (
            <PlayerListItem key={player.id}>
              {player.user_name}
              {roundPicks.filter((pick) => pick.user_id === player.id).length >
              0 ? (
                <DoneIcon color='inherit' />
              ) : null}
            </PlayerListItem>
          ))}
        </ul>

        <FormError errorMsg={error} />
      </Box>
    </>
  )
}
