import React from 'react'
import PropTypes from 'prop-types'

export const Lobby = ({ match }) => {
  return (
    <div>
      <h1>Game ID: {match.params.id}</h1>
    </div>
  )
}

Lobby.propTypes = {
  match: PropTypes.object.isRequired
}
