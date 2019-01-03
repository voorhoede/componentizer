import * as React from 'react';
const { FilePond } = require('react-filepond');
import styled from '../../styled-components'
import 'filepond/dist/filepond.min.css';

const StyledImageUploader = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FilePondWrapper = styled.div`
  width: 100%;
  max-width: 20rem;
`;

const ImageUploader: React.StatelessComponent<{}> = () => {
  return (
    <StyledImageUploader>
      <FilePondWrapper>
        <FilePond allowMultiple={true} maxFiles={3} server='/api'/>
      </FilePondWrapper>
    </StyledImageUploader>
  )
};

export default ImageUploader