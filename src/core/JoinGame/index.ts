import { connect } from 'react-redux'
import { JoinGame as JoinGameComponent } from './JoinGame'

import { currentUser } from 'common/store/currentUser'
import { logoutAction } from 'common/store/actions'

export const JoinGame = connect(null, {
  logoutAction,
  setAccessToken: currentUser.actions.setAccessToken,
})(JoinGameComponent)
