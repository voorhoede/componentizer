import styled, { css } from '../../styled-components'

export default styled.button`
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: ${props => props.theme.borderRadiusDefault};
  background-color: ${props => props.theme.themeColor};
  color: #fff;
  ${props => props.disabled && css`
      opacity: 0.5;
  `}
`