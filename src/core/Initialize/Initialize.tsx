import { FC, useEffect } from 'react'

import { TokenData } from 'common/store/types/tokenData'

interface InitializeProps {
  logoutAction: () => void
  tokenData: TokenData | null
}

export const Initialize: FC<InitializeProps> = ({
  logoutAction,
  tokenData,
}) => {
  useEffect(() => {
    if (tokenData && tokenData.exp < Date.now() / 1000) {
      logoutAction()
    }
  }, [logoutAction, tokenData])

  return null
}
