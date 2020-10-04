import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { playersSelectors, getPlayers } from 'common/store/players'
import { Leaderboard as LeaderboardComp } from './Leaderboard'

const mapStateToProps = (state: State) => ({
  gameId: currentUserSelectors.getGameId(state),
  players: playersSelectors.getPlayersSortedByScore(state),
})

export const Leaderboard = connect(mapStateToProps, { getPlayers })(
  LeaderboardComp,
)
