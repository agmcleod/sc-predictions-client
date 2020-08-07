import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { playersSelectors, getPlayers } from 'common/store/players'
import { Lobby as LobbyComp } from './Lobby'

const mapStateToProps = (state: State) => ({
  gameId: currentUserSelectors.getGameId(state),
  players: playersSelectors.getPlayers(state),
})

export const Lobby = connect(mapStateToProps, { getPlayers })(LobbyComp)
