import React, { FC, useEffect, useState } from 'react'

import { FormError } from 'common/components/FormError'
import { Role } from 'common/store/types/tokenData'
import { CreateNewRound } from './CreateNewRound'
import { LockedScreen } from './LockedScreen'
import { SelectPicks } from './SelectPicks'
import { ViewCurrentPicks } from './ViewCurrentPicks'
import { Leaderboard } from './Leaderboard'

interface CurrentPageProps {
  isFinished: boolean
  isLocked: boolean
  hasOpenRound: boolean
  role: Role
}

const CurrentPage: FC<CurrentPageProps> = ({
  isFinished,
  isLocked,
  hasOpenRound,
  role,
}) => {
  if (role === Role.Owner) {
    if (hasOpenRound) {
      return <ViewCurrentPicks />
    } else if (isLocked && !isFinished) {
      return <SelectPicks />
    } else if (!isFinished) {
      return <CreateNewRound />
    }
  }

  if (role === Role.Player) {
    if (hasOpenRound) {
      return <SelectPicks />
    } else if (isLocked) {
      return <LockedScreen />
    }
  }

  if (isFinished) {
    return <Leaderboard />
  }

  return null
}

interface CurrentRoundProps {
  getGameStatus: (setError: (msg: string) => void) => void
  getRoundStatus: (setError: (msg: string) => void) => void
  hasOpenRound: boolean
  isFinished: boolean
  isLocked: boolean
  role: Role
}

export const CurrentRound: FC<CurrentRoundProps> = ({
  getGameStatus,
  getRoundStatus,
  isFinished,
  isLocked,
  role,
  hasOpenRound,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getGameStatus(setError)
    getRoundStatus(setError)
  }, [getGameStatus, getRoundStatus])

  return (
    <>
      <CurrentPage
        hasOpenRound={hasOpenRound}
        isFinished={isFinished}
        isLocked={isLocked}
        role={role}
      />
      <FormError errorMsg={error} />
    </>
  )
}
