import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { publicApi } from '@common/api'

export const JoinGame = ({ setUUID }) => {
  const [state, setState] = useState({ userName: '', gameId: '' })

  const onSubmit = async e => {
    e.preventDefault()
    const response = await publicApi.post('/games/join', {
      name: state.userName,
      slug: state.gameId
    })

    setUUID(response.data.session_id)
  }

  return (
    <div>
      <h1>Join Game</h1>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor='userName'>Username</label>
          <input
            id='userName'
            type='text'
            value={state.userName}
            onChange={e => setState({ ...state, userName: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='gameId'>Game ID</label>
          <input
            id='gameId'
            type='text'
            value={state.gameId}
            onChange={e => setState({ ...state, gameId: e.target.value })}
          />
        </fieldset>
        <input type='Submit' value='Submit' />
      </form>
    </div>
  )
}

JoinGame.propTypes = {
  setUUID: PropTypes.func.isRequired
}
