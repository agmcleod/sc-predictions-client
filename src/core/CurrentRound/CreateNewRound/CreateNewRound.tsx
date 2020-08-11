import React, { FC } from 'react'
import Box from '@material-ui/core/Box'
import { Formik, Form } from 'formik'

import { Button } from 'common/components/Button'
import { FormError } from 'common/components/FormError'
import { TextField } from 'common/components/TextField'

import { validationSchema } from './validationSchema'

export const CreateNewRound: FC = () => {
  return (
    <Formik
      initialValues={{ playerOne: '', playerTwo: '' }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ errors, submitCount, values, setFieldValue }) => (
        <Form>
          <Box mb={2}>
            <TextField
              name='playerOne'
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
              value={values.playerTwo}
              onChange={(ev) => setFieldValue('playerTwo', ev.target.value)}
            />
            <FormError
              errorMsg={submitCount > 0 ? errors.playerTwo : undefined}
            />
          </Box>
          <Button type='submit'>Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
