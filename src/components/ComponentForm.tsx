import * as React from 'react';
import styled from '../styled-components'
import InputField from "./InputField";
import Button from '../components/styled-components/Button'
import ModalFooter from './styled-components/ModalFooter';
import TextArea from './TextArea';
import { Region } from './ImageEditor';

interface ComponentFormProps {
  onSubmit: Function
  onCancel: Function
  region?: Region
}

const StyledForm = styled.form`
  width: 100%;
`;

const ComponentForm: React.SFC<ComponentFormProps> = ({ onSubmit, region, onCancel }) => {
  let nameInputRef = React.useRef<HTMLInputElement>(null);
  const [state, updateState] = React.useState({
    name: region && region.data.name || '',
    description: region && region.data.description || '',
    index: region && region.data.index
  });

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    updateState(prevState => ({ ...prevState, [name]: value}))
  };


  React.useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus()
  }, []);

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ ...state });
      }}
    >
      <InputField
        label="Name"
        id="name"
        name="name"
        onChange={onInput}
        autoComplete="off"
        value={state.name}
        ref={nameInputRef}
      />
      <TextArea
        label="Description"
        id="description"
        name="description"
        value={state.description}
        onChange={onInput}
      />
      <ModalFooter>
        <Button
          type="button"
          onClick={() => onCancel(region && region.data.index)}
        >Cancel</Button>
        <Button
          disabled={Boolean(!state.name)}
        >Save <span className="icon">💾</span></Button>
      </ModalFooter>
    </StyledForm>
  )
};

export default ComponentForm