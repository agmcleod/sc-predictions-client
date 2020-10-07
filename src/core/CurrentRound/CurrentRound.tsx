import React, { FC, useEffect, useState } from 'react'

import { FormError } from 'common/components/FormError'
import { Role } from 'common/store/types/tokenData'

import { CurrentPage } from './CurrentPage'

interface CurrentRoundProps {
  getGameStatus: (setError: (msg: string) => void) => void
  getRoundStatus: (setError: (msg: string) => void) => void
  hasOpenRound: boolean
  isFinished: boolean
  isLocked: boolean
  role: Role | null
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
