import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { currentUser } from '@common/currentUser'
import { publicApi } from '@common/api'
import { Button } from '@common/components/Button'
import { FormError } from '@common/components/FormError'

import { QuestionsSelect } from './QuestionsSelect'
import { StyledFieldset } from './styledComponents'

function selectQuestion(gameQuestions, setGameQuestions, idx) {
  return event => {
    const id = event.target.value
    gameQuestions[idx].id = parseInt(id, 10)
    setGameQuestions(gameQuestions)
  }
}

const NewGameComponent = ({ history, setUUID }) => {
  const [questions, setQuestions] = useState([])
  const [gameQuestions, setGameQuestions] = useState([{ key: v4() }])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    publicApi
      .get('/questions')
      .then(response => {
        if (response.data) {
          setQuestions(response.data)
        }
      })
      .catch(err => console.error(err))
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    const errors = {}
    if (gameQuestions.filter(gq => !gq.id).length > 0) {
      errors.gameQuestions = 'Each question entry must have a question selected'
    }

    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      const response = await publicApi.post('games', {
        question_ids: gameQuestions.map(gq => gq.id)
      })

      setUUID(response.data.creator)

      history.push(`/lobby/${response.data.slug}`)
    }
  }

  const deleteFn = index => () => {
    const gqs = gameQuestions.slice(0)
    console.log('before', gqs.length, JSON.stringify(gqs), index)
    gqs.splice(index, 1)
    console.log('after', gqs.length, JSON.stringify(gqs), index)
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
                        i
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
                onClick={e => {
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
    </div>
  )
}

NewGameComponent.propTypes = {
  history: PropTypes.object.isRequired,
  setUUID: PropTypes.func.isRequired
}

export const NewGame = connect(
  null,
  {
    setUUID: currentUser.actions.setUUID
  }
)(NewGameComponent)
