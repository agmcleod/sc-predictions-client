import styled from 'styled-components'

interface StyledFieldsetProps {
  showBottomBorder: boolean
}

export const StyledFieldset = styled.fieldset<StyledFieldsetProps>`
  border: 0;
  ${({ showBottomBorder, theme }) =>
    showBottomBorder
      ? `border-bottom: 1px solid ${theme.colors.fieldBorder}`
      : ''}
`
