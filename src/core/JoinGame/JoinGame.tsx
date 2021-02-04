import React, { FC, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import { publicApi } from 'common/api'
import { getClient } from 'common/websocket'
import { Button } from 'common/components/Button'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'
import { TextField } from 'common/components/TextField'
import { FormError } from 'common/components/FormError'

interface JoinGameProps {
  logoutAction: () => void
  setAccessToken: (id: string) => void
}

export const JoinGame: FC<JoinGameProps> = ({
  logoutAction,
  setAccessToken,
}) => {
  const [state, setState] = useState({ userName: '', gameId: '' })
  const [error, setError] = useState('')
  const history = useHistory()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await publicApi.post('/games/join', {
        name: state.userName,
        slug: state.gameId,
      })

      logoutAction()
      const token = response.data.session_id
      if (token) {
        setAccessToken(token)
        const client = getClient()
        client.send(`/auth ${JSON.stringify({ token })}`)
        history.push('/lobby')
      }
    } catch (err) {
      setError(getErrorsFromResponse(err).join(', '))
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
            label='Game Code'
            inputProps={{ minlength: '6', maxlength: '6' }}
            onChange={(e) => setState({ ...state, gameId: e.target.value })}
            value={state.gameId}
          />
        </Box>
        <FormError errorMsg={error} />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}
