import { connect } from 'react-redux'
import { JoinGame as JoinGameComponent } from './JoinGame'

import { currentUser } from '@common/currentUser'

export const JoinGame = connect(
  null,
  {
    setUUID: currentUser.actions.setUUID
  }
)(JoinGameComponent)
