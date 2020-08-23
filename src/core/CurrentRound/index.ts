import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { gameSelectors, getGameStatus } from 'common/store/game'
import { CurrentRound as CurrentRoundComp } from './CurrentRound'

const mapStateToProps = (state: State) => ({
  hasOpenRound: gameSelectors.hasOpenRound(state),
  role: currentUserSelectors.getRole(state),
})

export const CurrentRound = connect(mapStateToProps, { getGameStatus })(
  CurrentRoundComp,
)
