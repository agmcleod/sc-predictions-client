import { connect } from 'react-redux'

import { State } from 'common/store'
import { roundSelectors, getRoundStatus, savePicks } from 'common/store/round'
import { SelectPicks as SelectPicksComp } from './SelectPicks'

const mapStateToProps = (state: State) => {
  const round = roundSelectors.getRound(state)
  return {
    playerNames: round.playerNames,
    questions: round.questions,
  }
}

export const SelectPicks = connect(mapStateToProps, {
  getRoundStatus,
  savePicks,
})(SelectPicksComp)
