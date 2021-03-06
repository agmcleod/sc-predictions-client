import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 } from 'uuid'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { publicApi } from 'common/api'
import { Button } from 'common/components/Button'
import { FormError } from 'common/components/FormError'
import { Link } from 'common/components/Link'
import { Role } from 'common/store/types/tokenData'

import { QuestionsSelect } from './QuestionsSelect'
import { StyledFieldset } from './styledComponents'

interface GameQuestion {
  id?: number
  key: string
}

function selectQuestion(
  gameQuestions: GameQuestion[],
  setGameQuestions: (gameQuestions: GameQuestion[]) => void,
  idx: number,
) {
  return (event: React.ChangeEvent<any>) => {
    const id = event.target.value
    gameQuestions[idx] = {
      ...gameQuestions[idx],
      id: parseInt(id, 10),
    }
    setGameQuestions(gameQuestions.slice(0))
  }
}

interface NewGameProps {
  accessToken: string
  getGameStatus: (setError: (msg: string) => void) => void
  hasUnfinishedRound: boolean
  logoutAction: () => void
  role: Role | null
  setAccessToken: (id: string) => void
}

interface NewGameErrors {
  gameQuestions?: string
}

export const NewGame: FC<NewGameProps> = ({
  accessToken,
  getGameStatus,
  hasUnfinishedRound,
  logoutAction,
  role,
  setAccessToken,
}) => {
  const [questions, setQuestions] = useState([])
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([
    { key: v4() },
  ])
  const [requestError, setRequestError] = useState('')
  const [errors, setErrors] = useState<NewGameErrors>({})
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      getGameStatus(setRequestError)
    }
  }, [accessToken, getGameStatus])

  useEffect(() => {
    publicApi
      .get('/questions')
      .then((response) => {
        if (response.data) {
          setQuestions(response.data)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors: NewGameErrors = {}
    if (gameQuestions.filter((gq) => !gq.id).length > 0) {
      errors.gameQuestions = 'Each question entry must have a question selected'
    }

    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      const response = await publicApi.post('games', {
        question_ids: gameQuestions.map((gq) => gq.id),
      })

      logoutAction()
      setAccessToken(response.data.creator)

      history.push('/lobby')
    }
  }

  const deleteFn = (index: number) => () => {
    const gqs = gameQuestions.slice(0)
    gqs.splice(index, 1)
    setGameQuestions(gqs)
  }

  return (
    <div>
      <Typography variant='h1'>New Game</Typography>
      <form onSubmit={onSubmit}>
        {gameQuestions.map((gameQuestion, i) => {
          return (
            <StyledFieldset
              key={gameQuestion.key}
              showBottomBorder={i + 1 < gameQuestions.length}
            >
              <Box paddingY={2}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <QuestionsSelect
                      id={gameQuestion.key}
                      label={`Question ${i + 1}`}
                      questions={questions}
                      onChange={selectQuestion(
                        gameQuestions,
                        setGameQuestions,
                        i,
                      )}
                      value={gameQuestion.id}
                    />
                  </Grid>
                  <Grid item>
                    {i > 0 ? (
                      <Button color='secondary' onClick={deleteFn(i)}>
                        Delete
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Box>
            </StyledFieldset>
          )
        })}
        <FormError errorMsg={errors.gameQuestions} />
        <Box marginY={2}>
          <Grid spacing={2} container>
            <Grid item>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  setGameQuestions(gameQuestions.concat({ key: v4() }))
                }}
                variant='contained'
              >
                Add Question
              </Button>
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained'>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>

      <FormError errorMsg={requestError} />

      <Box my={3}>
        <Typography variant='h3'>OR</Typography>
      </Box>
      {accessToken ? (
        !hasUnfinishedRound && role === Role.Owner ? (
          <Link href='/create-round'>Create new round</Link>
        ) : (
          <Link href='/round'>Continue current game</Link>
        )
      ) : (
        <Link href='/join'>Join game</Link>
      )}
    </div>
  )
}
