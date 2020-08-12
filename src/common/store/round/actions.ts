import { Dispatch } from 'redux'

import { publicApi } from 'common/api'
import { round } from 'common/store/round'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'

export const createRound = (
  playerOne: string,
  playerTwo: string,
  setError: (msg: string) => void,
) => async (dispatch: Dispatch) => {
  try {
    await publicApi.post('/rounds', {
      player_one: playerOne,
      player_two: playerTwo,
    })
    dispatch(round.actions.setPlayers({ playerOne, playerTwo }))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}
