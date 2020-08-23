import React, { FC } from 'react'

import { Role } from 'common/store/types/tokenData'
import { CreateNewRound } from './CreateNewRound'
import { SelectPicks } from './SelectPicks'

interface CurrentRoundProps {
  hasOpenRound: boolean
  role: Role
}

export const CurrentRound: FC<CurrentRoundProps> = ({ role, hasOpenRound }) => {
  if (role === Role.Owner && !hasOpenRound) return <CreateNewRound />

  if (role === Role.Player && hasOpenRound) {
    return <SelectPicks />
  }

  return null
}
