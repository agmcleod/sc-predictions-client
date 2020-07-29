import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

interface FormLabelProps {
  error?: string
}

export const FormLabel = styled(Typography).attrs({
  variant: 'body1',
  component: 'label',
})<FormLabelProps>`
  color: ${({ error, theme }) =>
    error ? theme.colors.error : theme.colors.mainText};
`
