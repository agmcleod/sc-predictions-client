import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import { ProtectedRoute } from './ProtectedRoute'
import { Initialize } from 'core/Initialize'
import { NewGame } from 'core/NewGame'
import { Lobby } from 'core/Lobby'
import { CreateNewRound } from 'core/CreateNewRound'
import { JoinGame } from 'core/JoinGame'
import { CurrentRound } from 'core/CurrentRound'

export const Routes: FC = () => {
  return (
    <Router>
      <Container>
        <Initialize />
        <Route path='/' exact component={NewGame} />
        <ProtectedRoute path='/lobby' component={Lobby} />
        <ProtectedRoute path='/create-round' component={CreateNewRound} />
        <Route path='/join' component={JoinGame} />
        <Route path='/round' component={CurrentRound} />
      </Container>
    </Router>
  )
}
