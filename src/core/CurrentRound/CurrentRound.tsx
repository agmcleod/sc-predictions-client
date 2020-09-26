import React, { FC, useEffect, useState } from 'react'

import { FormError } from 'common/components/FormError'
import { Role } from 'common/store/types/tokenData'
import { CreateNewRound } from './CreateNewRound'
import { SelectPicks } from './SelectPicks'
import { ViewCurrentPicks } from './ViewCurrentPicks'

interface CurrentRoundProps {
  getGameStatus: (setError: (msg: string) => void) => void
  hasOpenRound: boolean
  role: Role
}

export const CurrentRound: FC<CurrentRoundProps> = ({
  getGameStatus,
  role,
  hasOpenRound,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getGameStatus(setError)
  }, [getGameStatus])

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

  if (role === Role.Player && hasOpenRound) {
    return <SelectPicks />
  }

  return null
}
