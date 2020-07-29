import styled from 'styled-components'

export const StyledFieldset = styled.fieldset`
  border: 0;
  ${({ showBottomBorder, theme }) =>
    showBottomBorder
      ? `border-bottom: 1px solid ${theme.colors.fieldBorder}`
      : ''}
`
