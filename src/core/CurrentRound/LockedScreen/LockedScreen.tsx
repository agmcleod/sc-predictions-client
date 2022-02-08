import React, { FC, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { FormError } from 'common/components/FormError'

interface LockedScreenProps {
  isConnected: boolean
  getRoundStatus: (setError: (msg: string) => void) => void
}

export const LockedScreen: FC<LockedScreenProps> = ({
  getRoundStatus,
  isConnected,
}) => {
  const [error, setError] = useState('')
  useEffect(() => {
    getRoundStatus(setError)
    // then setup polling
    let interval: null | NodeJS.Timeout = null
    if (!isConnected) {
      interval = setInterval(() => {
        getRoundStatus(setError)
      }, 5000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [getRoundStatus, isConnected])

  return (
    <>
      <Box mb={2}>
        <Typography variant='h1'>Round is locked</Typography>
      </Box>
      <p>
        Enjoy the game! You will see the scoring once the answers are all
        marked.
      </p>
      <FormError errorMsg={error} />
    </>
  )
}
