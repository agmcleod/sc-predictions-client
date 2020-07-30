import React, { FC, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { publicApi } from 'common/api'
import { Button } from 'common/components/Button'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'
import { TextField } from 'common/components/TextField'
import { FormError } from 'common/components/FormError'

interface JoinGameProps {
  setAccessToken: (id: string) => void
}

export const JoinGame: FC<JoinGameProps> = ({ setAccessToken }) => {
  const [state, setState] = useState({ userName: '', gameId: '' })
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await publicApi.post('/games/join', {
        name: state.userName,
        slug: state.gameId,
      })

      setAccessToken(response.data.session_id)
    } catch (err) {
      setError(getErrorsFromResponse(err).join(', '))
      console.log(err.response)
    }
  }

  return (
    <div>
      <Typography variant='h1'>Join Game</Typography>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            label='Username'
            onChange={(e) => setState({ ...state, userName: e.target.value })}
            value={state.userName}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label='Game ID'
            inputProps={{ minlength: '6', maxlength: '6' }}
            onChange={(e) => setState({ ...state, gameId: e.target.value })}
            value={state.gameId}
          />
        </Box>
        <FormError errorMsg={error} />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </div>
  )
}
