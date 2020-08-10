import { Dispatch } from 'redux'

import { publicApi } from 'common/api'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'
import { game } from './slice'

export const getGameStatus = (
  gameId: number,
  setError: (msg: string) => void,
) => async (dispatch: Dispatch) => {
  try {
    const res = await publicApi.get(`/games/${gameId}`)

    dispatch(game.actions.setGameStatus(res.data.slug))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}
