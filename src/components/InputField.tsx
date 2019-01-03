import * as React from 'react'
import styled from '../styled-components'

interface InputProps {
  label: string
  id: string
  name: string
  onChange: Function
  [propName: string]: {}
}

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  
  label {
    margin-bottom: 0.5rem;
  }
  
  input {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: ${props => props.theme.borderRadiusDefault};
    border: 1px solid ${props => props.theme.borderColor};
  }
`;

const InputField: React.SFC<InputProps> = ({ label, id, name, onChange, ...rest }) => (
  <InputGroup>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      onChange={e => onChange(e)}
      {...rest}
    />
  </InputGroup>
);

export default InputField