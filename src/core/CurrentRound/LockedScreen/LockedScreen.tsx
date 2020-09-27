import React, { FC } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export const LockedScreen: FC = () => {
  return (
    <>
      <Box mb={2}>
        <Typography variant='h1'>Round is locked</Typography>
      </Box>
      <p>
        Enjoy the game! You will see the scoring once the answers are all
        marked.
      </p>
    </>
  )
}
