import React, { FC, useState, useEffect } from 'react'
import { Formik, FieldArray, Form, ArrayHelpers, FormikErrors } from 'formik'
import Box from '@material-ui/core/Box'

import { Button } from 'common/components/Button'
import { FormError } from 'common/components/FormError'
import { Select, ChangeEvent } from 'common/components/Select'
import { Question } from 'common/store/types/question'
import { getErrorMessageFromArray } from 'common/utils/getErrorMessageFromArray'
import { validationSchema } from './validationSchema'

type Answers = { id: number; value: string }[]

interface SelectPicksProps {
  getRoundStatus: (setError: (msg: string) => void) => void
  playerNames: string[]
  questions: Question[]
  savePicks: (answers: Answers) => void
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
      onSubmit={(values) => savePicks(values.answers)}
      validationSchema={validationSchema}
    >
      {({ values, errors }) => (
        <Form>
          <FieldArray name='answers'>
            {(arrayHelpers) =>
              values.answers.map((answer, i) => (
                <Box key={answer.id} mb={2}>
                  <Select
                    id={`question_${answer.id}`}
                    label='Select answer'
                    options={playerNames.map((pn) => ({
                      value: pn,
                      label: pn,
                    }))}
                    onChange={onChangeAnswer(arrayHelpers, answer.id, i)}
                    value={answer}
                  />
                  <FormError
                    errorMsg={getErrorMessageFromArray(errors.answers, i)}
                  />
                </Box>
              ))
            }
          </FieldArray>
          <Button type='submit'>Save picks</Button>
        </Form>
      )}
      <FormError errorMsg={error} />
    </Formik>
  )
}
