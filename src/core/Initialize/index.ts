import { connect } from 'react-redux'

import { State } from 'common/store'
import { logoutAction } from 'common/store/actions'
import { currentUserSelectors } from 'common/store/currentUser'
import { Initialize as InitializeComp } from './Initialize'

const mapStateToProps = (state: State) => ({
  tokenData: currentUserSelectors.getTokenData(state),
})

export const Initialize = connect(mapStateToProps, { logoutAction })(
  InitializeComp,
)
