import styled, { css } from '../../styled-components'

export default styled.button`
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadiusDefault};
  background-color: ${(props) => props.theme.themeColor};
  color: #fff;
  cursor: pointer;
  line-height: 1rem;
  transition: transform 0.1s, opacity 0.3s;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}

  &:hover:not([disabled]),
  &:focus {
    outline: none;
    transform: scale(1.05);
  }

  .icon {
    margin-left: 0.25rem;
    speak: none;
  }
`
