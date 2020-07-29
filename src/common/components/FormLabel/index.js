import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const FormLabel = styled(Typography).attrs({
  variant: 'body1',
  component: 'label'
})`
  color: ${({ error, theme }) =>
    error ? theme.colors.error : theme.colors.mainText};
`
