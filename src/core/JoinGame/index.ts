import { connect } from 'react-redux'
import { JoinGame as JoinGameComponent } from './JoinGame'

import { currentUser } from 'common/store/currentUser'

export const JoinGame = connect(null, {
  setAccessToken: currentUser.actions.setAccessToken,
})(JoinGameComponent)
