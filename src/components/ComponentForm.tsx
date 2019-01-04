import * as React from 'react';
import styled from '../styled-components'
import InputField from "./InputField";
import Button from '../components/styled-components/Button'
import ModalFooter from './styled-components/ModalFooter';

interface ComponentFormProps {
  onSubmit: Function
  onCancel: Function
  regionIndex: number
}

const StyledForm = styled.form`
  width: 100%;
`;

const ComponentForm: React.SFC<ComponentFormProps> = ({ onSubmit, regionIndex, onCancel }) => {
  let nameInputRef = React.useRef<HTMLInputElement>(null);
  const [state, updateState] = React.useState({
    name: '',
    regionIndex
  });

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    updateState(prevState => ({ ...prevState, [name]: value}))
  };


  React.useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus()
  });

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        onSubmit(state.regionIndex, state.name);
      }}
    >
      <InputField
        label="Name"
        id="name"
        name="name"
        onChange={onInput}
        autoComplete="off"
        ref={nameInputRef}
      />
      <ModalFooter>
        <Button
          type="button"
          onClick={() => onCancel(regionIndex)}
        >Cancel</Button>
        <Button
          disabled={Boolean(!state.name)}
        >Save <span className="icon">💾</span></Button>
      </ModalFooter>
    </StyledForm>
  )
};

export default ComponentForm