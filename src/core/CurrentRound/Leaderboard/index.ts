import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { playersSelectors, getPlayers } from 'common/store/players'
import { getGameStatus } from 'common/store/game'
import { getRoundStatus } from 'common/store/round'
import { websocketSelectors } from 'common/store/websocket'
import { Leaderboard as LeaderboardComp } from './Leaderboard'

const mapStateToProps = (state: State) => ({
  gameId: currentUserSelectors.getGameId(state),
  players: playersSelectors.getPlayersSortedByScore(state),
  role: currentUserSelectors.getRole(state),
  isConnected: websocketSelectors.isConnected(state),
})

export const Leaderboard = connect(mapStateToProps, {
  getGameStatus,
  getRoundStatus,
  getPlayers,
})(LeaderboardComp)
