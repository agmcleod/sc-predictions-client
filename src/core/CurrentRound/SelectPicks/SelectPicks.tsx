import React, { FC, useState, useEffect } from 'react'
import { Formik, FieldArray, Form, ArrayHelpers } from 'formik'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { Button } from 'common/components/Button'
import { FormError } from 'common/components/FormError'
import { Select, ChangeEvent } from 'common/components/Select'
import { Question } from 'common/store/types/question'
import { getErrorMessageFromArray } from 'common/utils/getErrorMessageFromArray'
import { Answers } from 'common/store/types/round'
import { validationSchema } from './validationSchema'

interface SelectPicksProps {
  getRoundStatus: (setError: (msg: string) => void) => void
  playerNames: string[]
  questions: Question[]
  savePicks: (answers: Answers, setError: (msg: string) => void) => void
}

const onChangeAnswer = (
  arrayHelpers: ArrayHelpers,
  questionId: number,
  index: number,
) => (event: ChangeEvent) => {
  const playerName = event.target.value
  arrayHelpers.replace(index, { id: questionId, value: playerName })
}

export const SelectPicks: FC<SelectPicksProps> = ({
  getRoundStatus,
  playerNames,
  questions,
  savePicks,
}) => {
  const [error, setError] = useState('')

  useEffect(() => {
    getRoundStatus(setError)
  }, [getRoundStatus])

  return (
    <Formik
      initialValues={{
        answers: questions.map((q) => ({ id: q.id, value: '' })),
      }}
      onSubmit={(values) => savePicks(values.answers, setError)}
      validationSchema={validationSchema}
    >
      {({ values, errors }) => (
        <Form>
          <Typography variant='h1'>Select your picks</Typography>
          <FieldArray name='answers'>
            {(arrayHelpers) =>
              values.answers.map((answer, i) => (
                <Box key={answer.id} mb={2}>
                  <Select
                    id={`question_${answer.id}`}
                    label={questions[i].body}
                    options={playerNames.map((pn) => ({
                      value: pn,
                      label: pn,
                    }))}
                    onChange={onChangeAnswer(arrayHelpers, answer.id, i)}
                    value={answer.value}
                  />
                  <FormError
                    errorMsg={getErrorMessageFromArray(errors.answers, i)}
                  />
                </Box>
              ))
            }
          </FieldArray>
          <Button type='submit'>Save picks</Button>
          <FormError errorMsg={error} />
        </Form>
      )}
    </Formik>
  )
}