import React from 'react'

export const Lobby = ({ match }) => {
  return (
    <div>
      <h1>Game ID: {match.params.id}</h1>
    </div>
  )
}
