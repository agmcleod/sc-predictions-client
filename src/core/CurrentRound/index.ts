import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { gameSelectors, getGameStatus } from 'common/store/game'
import { roundSelectors, getRoundStatus } from 'common/store/round'
import { CurrentRound as CurrentRoundComp } from './CurrentRound'

const mapStateToProps = (state: State) => ({
  hasOpenRound: gameSelectors.hasOpenRound(state),
  isLocked: roundSelectors.isLocked(state),
  isFinished: roundSelectors.isFinished(state),
  role: currentUserSelectors.getRole(state),
})

export const CurrentRound = connect(mapStateToProps, {
  getGameStatus,
  getRoundStatus,
})(CurrentRoundComp)
