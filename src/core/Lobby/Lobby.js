import React from 'react'
import PropTypes from 'prop-types'

const JOIN_URL = `${process.env.REACT_APP_HOST}/join`

export const Lobby = ({ match }) => {
  return (
    <div>
      <h1>Game ID: {match.params.id}</h1>
      <p>
        Tell your players the Game ID, and to join at:{' '}
        <a href={JOIN_URL}>{JOIN_URL}</a>
      </p>
    </div>
  )
}

Lobby.propTypes = {
  match: PropTypes.object.isRequired
}
