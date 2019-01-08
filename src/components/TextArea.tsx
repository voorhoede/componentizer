import * as React from 'react'
import styled from '../styled-components'
import { Ref } from "react";

interface TextAreaProps {
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
  
  textarea {
    height: 7.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: ${props => props.theme.borderRadiusDefault};
    border: 2px solid ${props => props.theme.borderColor};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.themeColor};
    }
  }
`;

const TextArea = ({ label, id, name, onChange, ...props }: TextAreaProps) => {
  return (    
    <InputGroup>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        onChange={e => onChange(e)}
        {...props}
      />
    </InputGroup>
  )
};

export default TextArea