import React, { FC } from 'react'
import { Text } from './styledComponents'

interface FormErrorProps {
  errorMsg?: string
}

export const FormError: FC<FormErrorProps> = ({ errorMsg }) => {
  if (!errorMsg) return null

  return <Text>{errorMsg}</Text>
}
