import { Dispatch } from 'redux'
import { History } from 'history'

import { publicApi } from 'common/api'
import { ThunkDispatch, State } from 'common/store'
import { round } from 'common/store/round'
import { getGameStatus, game } from 'common/store/game'
import { Answers } from 'common/store/types/round'
import { getErrorsFromResponse } from 'common/getErrorsFromResponse'

export const createRound = (
  history: History,
  playerOne: string,
  playerTwo: string,
  setError: (msg: string) => void,
) => async (dispatch: ThunkDispatch, getState: () => State) => {
  try {
    await publicApi.post('/rounds', {
      player_one: playerOne,
      player_two: playerTwo,
    })
    // fetch the data, so the owner's screen updates
    dispatch(getGameStatus(setError))
    history.push('/round')
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}

export const getRoundStatus = (setError: (msg: string) => void) => async (
  dispatch: Dispatch,
) => {
  try {
    const res = await publicApi.get('/current-round')
    dispatch(round.actions.setData(res.data))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}

export const savePicks = (
  answers: Answers,
  setError: (msg: string) => void,
) => async (dispatch: Dispatch) => {
  try {
    await publicApi.post('/rounds/set-picks', { answers })
    dispatch(round.actions.setPicksChosen(true))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}

export const getRoundPicks = (setError: (msg: string) => void) => async (
  dispatch: Dispatch,
) => {
  try {
    const res = await publicApi.get('/rounds/picks')
    dispatch(round.actions.setRoundPicks(res.data.data))
    dispatch(round.actions.setLocked(res.data.locked))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}

export const lockRound = (setError: (msg: string) => void) => async (
  dispatch: Dispatch,
) => {
  try {
    await publicApi.post('/rounds/lock')
    dispatch(round.actions.setLocked(true))
    dispatch(game.actions.setOpenRound(false))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}

export const scoreRound = (
  answers: Answers,
  setError: (msg: string) => void,
) => async (dispatch: Dispatch) => {
  try {
    await publicApi.post('/rounds/score', {
      answers: answers.map((a) => ({
        question_id: a.id,
        answer: a.value,
      })),
    })
    dispatch(round.actions.setFinished(true))
  } catch (err) {
    setError(getErrorsFromResponse(err).join(', '))
  }
}
