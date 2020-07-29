import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { publicApi } from '@common/api'
import { Button } from '@common/components/Button'
import { getErrorsFromResponse } from '@common/getErrorsFromResponse'
import { TextField } from '@common/components/TextField'
import { FormError } from '@common/components/FormError'

export const JoinGame = ({ setUUID }) => {
  const [state, setState] = useState({ userName: '', gameId: '' })
  const [error, setError] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const response = await publicApi.post('/games/join', {
        name: state.userName,
        slug: state.gameId
      })

      setUUID(response.data.session_id)
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
            onChange={e => setState({ ...state, userName: e.target.value })}
            value={state.userName}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label='Game ID'
            inputProps={{ minlength: '6', maxlength: '6' }}
            onChange={e => setState({ ...state, gameId: e.target.value })}
            value={state.gameId}
          />
        </Box>
        <FormError errorMsg={error} />
        <Button type='Submit' variant='contained'>
          Submit
        </Button>
      </form>
    </div>
  )
}

JoinGame.propTypes = {
  setUUID: PropTypes.func.isRequired
}
