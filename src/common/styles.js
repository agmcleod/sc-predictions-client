import styled from 'styled-components'

export const FormLabel = styled.label`
  color: ${({ error }) => (error ? 'red' : 'black')};
`
