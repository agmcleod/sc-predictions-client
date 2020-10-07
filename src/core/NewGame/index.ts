import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUser, currentUserSelectors } from 'common/store/currentUser'
import { gameSelectors, getGameStatus } from 'common/store/game'
import { logoutAction } from 'common/store/actions'
import { NewGame as NewGameComponent } from './NewGame'

const mapStateToProps = (state: State) => ({
  accessToken: currentUserSelectors.getAccessToken(state),
  hasUnfinishedRound: gameSelectors.hasUnfinishedRound(state),
  role: currentUserSelectors.getRole(state),
})

export const NewGame = connect(mapStateToProps, {
  getGameStatus,
  logoutAction,
  setAccessToken: currentUser.actions.setAccessToken,
})(NewGameComponent)
