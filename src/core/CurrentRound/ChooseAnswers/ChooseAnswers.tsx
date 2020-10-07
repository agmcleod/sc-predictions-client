import React, { FC, useState } from 'react'
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

interface ChooseAnswersProps {
  playerNames: string[]
  questions: Question[]
  scoreRound: (answers: Answers, setError: (msg: string) => void) => void
}

const onChangeAnswer = (
  arrayHelpers: ArrayHelpers,
  questionId: number,
  index: number,
) => (event: ChangeEvent) => {
  const playerName = event.target.value
  arrayHelpers.replace(index, { id: questionId, value: playerName })
}

export const ChooseAnswers: FC<ChooseAnswersProps> = ({
  playerNames,
  questions,
  scoreRound,
}) => {
  const [error, setError] = useState('')

  // hide until data is here
  if (questions.length === 0 || playerNames.length === 0) {
    return null
  }

  return (
    <Formik
      initialValues={{
        answers: questions.map((q) => ({ id: q.id, value: '' })),
      }}
      onSubmit={(values) => scoreRound(values.answers, setError)}
      validationSchema={validationSchema}
    >
      {({ values, submitCount, errors }) => (
        <Form>
          <Typography variant='h1'>Select answers for round</Typography>
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
                    errorMsg={
                      submitCount > 0
                        ? getErrorMessageFromArray(errors.answers, i)
                        : undefined
                    }
                  />
                </Box>
              ))
            }
          </FieldArray>
          <Button type='submit'>Score round</Button>
          <FormError errorMsg={error} />
        </Form>
      )}
    </Formik>
  )
}
