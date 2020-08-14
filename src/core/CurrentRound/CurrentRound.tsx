import React, { FC } from 'react'

import { Role } from 'common/store/types/tokenData'
import { CreateNewRound } from './CreateNewRound'

interface CurrentRoundProps {
  hasOpenRound: boolean
  role: Role
}

export const CurrentRound: FC<CurrentRoundProps> = ({ role, hasOpenRound }) => {
  return role === Role.Owner && !hasOpenRound ? <CreateNewRound /> : null
}
