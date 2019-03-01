import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { currentUser } from '@common/currentUser'
import { publicApi } from '@common/api'
import { FormLabel } from '@common/styles'
import { FormError } from '@common/components/FormError'

import { QuestionsSelect } from './QuestionsSelect'

function selectQuestion(gameQuestions, setGameQuestions, idx) {
  return event => {
    const id = event.target.value
    gameQuestions[idx].id = parseInt(id, 10)
    setGameQuestions(gameQuestions)
  }
}

const NewGameComponent = ({ history, setUUID }) => {
  const [questions, setQuestions] = useState([])
  const [gameQuestions, setGameQuestions] = useState([{}])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    publicApi.get('/questions').then(response => {
      if (response.data.questions) {
        setQuestions(response.data.questions)
      }
    })
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

  return (
    <div>
      <h1>New Game</h1>
      <form onSubmit={onSubmit}>
        {gameQuestions.map((gameQuestion, i) => {
          const id = `question_${i}`
          return (
            <fieldset key={id}>
              <FormLabel htmlFor={id} error={Boolean(errors.gameQuestions)}>
                Question {i + 1}
              </FormLabel>
              <QuestionsSelect
                id={id}
                questions={questions}
                onChange={selectQuestion(gameQuestions, setGameQuestions, i)}
                value={gameQuestion.id}
              />
            </fieldset>
          )
        })}
        <FormError errorMsg={errors.gameQuestions} />
        <button
          onClick={e => {
            e.preventDefault()
            setGameQuestions(gameQuestions.concat({}))
          }}
        >
          Add Question
        </button>
        <input type='submit' value='Create' />
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
