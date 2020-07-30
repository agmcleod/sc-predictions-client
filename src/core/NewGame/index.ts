import { connect } from 'react-redux'

import { currentUser } from 'common/store/currentUser'
import { NewGame as NewGameComponent } from './NewGame'

export const NewGame = connect(null, {
  setAccessToken: currentUser.actions.setAccessToken,
})(NewGameComponent)
