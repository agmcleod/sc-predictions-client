import { Dispatch } from 'redux'

import { publicApi } from 'common/api'
import { round } from 'common/store/round'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'

interface CreateRoundParams {
  playerOne: string
  playerTwo: string
}

export const createRound = (
  fields: CreateRoundParams,
  setError: (msg: string) => void,
) => async (dispatch: Dispatch) => {
  try {
    await publicApi.post('/round', fields)
    dispatch(round.actions.setPlayers(fields))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}
