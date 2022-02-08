import { Dispatch } from 'redux'

import { publicApi } from 'common/api'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'
import { players } from './slice'

export const getPlayers =
  (gameId: number, setError: (msg: string) => void) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await publicApi.get(`/games/${gameId}/players`)

      dispatch(players.actions.setPlayers(res.data))
    } catch (err: any) {
      setError(getErrorsFromResponse(err).join(', '))
    }
  }
