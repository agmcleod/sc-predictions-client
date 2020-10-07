import { Dispatch } from 'redux'

import { publicApi } from 'common/api'
import { State } from 'common/store'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'
import { currentUserSelectors } from 'common/store/currentUser'
import { game } from './slice'

export const getGameStatus = (setError: (msg: string) => void) => async (
  dispatch: Dispatch,
  getState: () => State,
) => {
  try {
    const gameId = currentUserSelectors.getGameId(getState())
    const res = await publicApi.get(`/games/${gameId}`)

    dispatch(game.actions.setGameStatus(res.data))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}
