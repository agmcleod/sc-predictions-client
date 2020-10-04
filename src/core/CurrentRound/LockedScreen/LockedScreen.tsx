import React, { FC, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { FormError } from 'common/components/FormError'

interface LockedScreenProps {
  getRoundStatus: (setError: (msg: string) => void) => void
}

export const LockedScreen: FC<LockedScreenProps> = ({ getRoundStatus }) => {
  const [error, setError] = useState('')
  useEffect(() => {
    getRoundStatus(setError)
    // then setup polling
    const interval = setInterval(() => {
      getRoundStatus(setError)
    }, 5000)

    return () => clearInterval(interval)
  }, [getRoundStatus])

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
