import React, { FC, useEffect, useState } from 'react'

import { FormError } from 'common/components/FormError'
import { Role } from 'common/store/types/tokenData'
import { CreateNewRound } from './CreateNewRound'
import { LockedScreen } from './LockedScreen'
import { SelectPicks } from './SelectPicks'
import { ViewCurrentPicks } from './ViewCurrentPicks'

interface CurrentRoundProps {
  getGameStatus: (setError: (msg: string) => void) => void
  getRoundStatus: (setError: (msg: string) => void) => void
  hasOpenRound: boolean
  isLocked: boolean
  role: Role
}

export const CurrentRound: FC<CurrentRoundProps> = ({
  getGameStatus,
  getRoundStatus,
  isLocked,
  role,
  hasOpenRound,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getGameStatus(setError)
    getRoundStatus(setError)
  }, [getGameStatus, getRoundStatus])

  if (error) {
    return <FormError errorMsg={error} />
  }

  if (role === Role.Owner) {
    if (hasOpenRound) {
      return <ViewCurrentPicks />
    } else {
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

  return null
}
