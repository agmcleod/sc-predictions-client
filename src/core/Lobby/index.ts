import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { gameSelectors, getGameStatus } from 'common/store/game'
import { playersSelectors, getPlayers } from 'common/store/players'
import { websocketSelectors } from 'common/store/websocket'
import { Lobby as LobbyComp } from './Lobby'

const mapStateToProps = (state: State) => ({
  gameId: currentUserSelectors.getGameId(state),
  gameSlug: gameSelectors.getSlug(state),
  hasOpenRound: gameSelectors.hasOpenRound(state),
  role: currentUserSelectors.getRole(state),
  players: playersSelectors.getPlayers(state),
  isConnected: websocketSelectors.isConnected(state),
})

export const Lobby = connect(mapStateToProps, { getPlayers, getGameStatus })(
  LobbyComp,
)
