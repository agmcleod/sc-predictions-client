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

    const { slug, open_round } = res.data
    dispatch(game.actions.setGameStatus({ slug, openRound: open_round }))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}
