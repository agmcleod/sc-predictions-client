import React from 'react'
import PropTypes from 'prop-types'
import { Text } from './styledComponents'

export default function FormError({ errorMsg }) {
  if (!errorMsg) return null

  return <Text>{errorMsg}</Text>
}

FormError.propTypes = {
  errorMsg: PropTypes.string
}
