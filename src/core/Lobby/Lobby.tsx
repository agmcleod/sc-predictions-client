import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const JOIN_URL = `${process.env.REACT_APP_HOST}/join`

interface LobbyParams {
  id: string
}

export const Lobby: FC = () => {
  const params = useParams<LobbyParams>()

  return (
    <div>
      <h1>Game ID: {params.id}</h1>
      <p>
        Tell your players the Game ID, and to join at:{' '}
        <a href={JOIN_URL}>{JOIN_URL}</a>
      </p>
    </div>
  )
}
