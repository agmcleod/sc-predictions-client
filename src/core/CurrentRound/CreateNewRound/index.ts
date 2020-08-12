import { connect } from 'react-redux'

import { CreateNewRound as CreateNewRoundComp } from './CreateNewRound'

import { createRound } from 'common/store/round'

export const CreateNewRound = connect(null, { createRound })(CreateNewRoundComp)
