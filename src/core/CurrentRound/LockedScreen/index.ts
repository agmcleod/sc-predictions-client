import { connect } from 'react-redux'

import { getRoundStatus } from 'common/store/round'
import { LockedScreen as LockedScreenComp } from './LockedScreen'

export const LockedScreen = connect(null, { getRoundStatus })(LockedScreenComp)
