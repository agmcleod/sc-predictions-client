import { connect } from 'react-redux'

import { State } from 'common/store'
import { getRoundStatus } from 'common/store/round'
import { websocketSelectors } from 'common/store/websocket'
import { LockedScreen as LockedScreenComp } from './LockedScreen'

const mapStateToProps = (state: State) => ({
  isConnected: websocketSelectors.isConnected(state),
})

export const LockedScreen = connect(mapStateToProps, { getRoundStatus })(
  LockedScreenComp,
)
