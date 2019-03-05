import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { publicApi } from '@common/api'

export const JoinGame = ({ setUUID }) => {
  const [state, setState] = useState({ userName: '', gameId: '' })

  const onSubmit = async e => {
    e.preventDefault()
    const response = await publicApi.post('/api/games/join', {
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
            value={state.username}
            onChange={v => setState({ ...state, username: v })}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='gameId'>Game ID</label>
          <input
            id='gameId'
            type='text'
            value={state.gameId}
            onChange={v => setState({ ...state, gameId: v })}
          />
        </fieldset>
      </form>
    </div>
  )
}

JoinGame.propTypes = {
  setUUID: PropTypes.func.isRequired
}
