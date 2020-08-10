import { connect } from 'react-redux'

import { State } from 'common/store'
import { currentUserSelectors } from 'common/store/currentUser'
import { ProtectedRoute as ProtectedRouteComp } from './ProtectedRoute'

const mapStateToProps = (state: State) => ({
  accessToken: currentUserSelectors.getAccessToken(state),
})

export const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComp)
