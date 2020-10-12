import React, { FC } from 'react'

import { Role } from 'common/store/types/tokenData'
import { LockedScreen } from './LockedScreen'
import { SelectPicks } from './SelectPicks'
import { ChooseAnswers } from './ChooseAnswers'
import { ViewCurrentPicks } from './ViewCurrentPicks'
import { Leaderboard } from './Leaderboard'

interface CurrentPageProps {
  isFinished: boolean
  isLocked: boolean
  hasOpenRound: boolean
  role: Role | null
}

export const CurrentPage: FC<CurrentPageProps> = ({
  isFinished,
  isLocked,
  hasOpenRound,
  role,
}) => {
  if (role === Role.Owner) {
    if (hasOpenRound) {
      return <ViewCurrentPicks />
    } else if (isLocked && !isFinished) {
      return <ChooseAnswers />
    }
  }

  if (role === Role.Player) {
    if (hasOpenRound && !isLocked) {
      return <SelectPicks />
    } else if (isLocked && !isFinished) {
      return <LockedScreen />
    }
  }

  if (isFinished) {
    return <Leaderboard />
  }

  return null
}
