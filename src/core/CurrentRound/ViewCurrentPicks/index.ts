import { connect } from 'react-redux'

import { State } from 'common/store'
import { getRoundPicks, roundSelectors, lockRound } from 'common/store/round'
import { currentUserSelectors } from 'common/store/currentUser'
import { playersSelectors, getPlayers } from 'common/store/players'
import { ViewCurrentPicks as ViewCurrentPicksComp } from './ViewCurrentPicks'

const mapStateToProps = (state: State) => ({
  gameId: currentUserSelectors.getGameId(state),
  players: playersSelectors.getPlayers(state),
  roundPicks: roundSelectors.getRoundPicks(state),
  isLocked: roundSelectors.isLocked(state),
})

export const ViewCurrentPicks = connect(mapStateToProps, {
  getPlayers,
  getRoundPicks,
  lockRound,
})(ViewCurrentPicksComp)
