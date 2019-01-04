import styled, { css } from '../../styled-components'

export default styled.button`
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: ${props => props.theme.borderRadiusDefault};
  background-color: ${props => props.theme.themeColor};
  color: #fff;
  cursor: pointer;
  line-height: 1rem;
  
  ${props => props.disabled && css`
      opacity: 0.5;
  `}

  .icon {
    margin-left: 0.25rem;
  }
`