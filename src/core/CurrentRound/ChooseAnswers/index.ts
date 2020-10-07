import { connect } from 'react-redux'

import { State } from 'common/store'
import { roundSelectors, scoreRound } from 'common/store/round'
import { ChooseAnswers as ChooseAnswersComp } from './ChooseAnswers'

const mapStateToProps = (state: State) => {
  const round = roundSelectors.getRound(state)
  return {
    playerNames: round.playerNames,
    questions: round.questions,
  }
}

export const ChooseAnswers = connect(mapStateToProps, {
  scoreRound,
})(ChooseAnswersComp)
