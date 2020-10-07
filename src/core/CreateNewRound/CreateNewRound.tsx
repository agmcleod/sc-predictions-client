import React, { FC, useState } from 'react'
import { History } from 'history'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Formik, Form } from 'formik'

import { Button } from 'common/components/Button'
import { FormError } from 'common/components/FormError'
import { TextField } from 'common/components/TextField'

import { validationSchema } from './validationSchema'

interface CreateNewRoundProps {
  createRound: (
    history: History,
    playerOne: string,
    playerTwo: string,
    setError: (msg: string) => void,
  ) => void
}

export const CreateNewRound: FC<CreateNewRoundProps> = ({ createRound }) => {
  const [error, setError] = useState('')
  const history = useHistory()

  return (
    <Formik
      initialValues={{ playerOne: '', playerTwo: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setError('')
        createRound(history, values.playerOne, values.playerTwo, setError)
      }}
    >
      {({ errors, submitCount, values, setFieldValue }) => (
        <Form>
          <Typography variant='h1'>Start new round</Typography>
          <Box mb={2}>
            <TextField
              name='playerOne'
              label='Player One'
              value={values.playerOne}
              onChange={(ev) => setFieldValue('playerOne', ev.target.value)}
            />
            <FormError
              errorMsg={submitCount > 0 ? errors.playerOne : undefined}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name='playerTwo'
              label='Player Two'
              value={values.playerTwo}
              onChange={(ev) => setFieldValue('playerTwo', ev.target.value)}
            />
            <FormError
              errorMsg={submitCount > 0 ? errors.playerTwo : undefined}
            />
          </Box>
          <FormError errorMsg={error} />
          <Button type='submit'>Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
