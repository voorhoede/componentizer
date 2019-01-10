import styled from '../../styled-components'

export default styled.form`
  label {
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: ${props => props.theme.borderRadiusDefault};
    border: 2px solid ${props => props.theme.borderColor};
    margin-bottom: 1rem;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.themeColor};
    }
  }

  textarea {
    width: 100%;
    height: 7.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: ${props => props.theme.borderRadiusDefault};
    border: 2px solid ${props => props.theme.borderColor};
    margin-bottom: 1rem;
  
    &:focus {
      outline: none;
      border-color: ${props => props.theme.themeColor};
    }
  }

  .autosuggestions {
    list-style: none;
    position: absolute;
    width: 100%;
    top: calc(100% - 1rem);
    left: 0;
    background-color: #fff;
    border-radius: ${props => props.theme.borderRadiusDefault};
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    
    li {
      padding: 0.5rem;

      &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.neutralColor};
      }

      &.selected {
        background-color: ${props => props.theme.neutralColor}
      }
    }
  }
`