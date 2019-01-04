import * as React from 'react';
const { FilePond } = require('react-filepond');
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from "react-router";
import styled from '../styled-components'
import 'filepond/dist/filepond.min.css';
import createCloudinary from '../lib/createCloudinary'

export interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
}

const StyledImageUploader = styled.div`
  width: 100%;
  max-width: 20rem;
  border-radius: ${props => props.theme.borderRadiusLarge};
  overflow: hidden;
  
  .filepond--root {
    margin-bottom: 0;
  }
`;

const ImageUploader: React.SFC<RouteComponentProps> = ({ history }) => {
  function onSuccess(imgData: CloudinaryImage) {
    history.push('/edit', { imgData })
  }

  return (
    <StyledImageUploader>
      <FilePond
        allowMultiple={false}
        server={createCloudinary(process.env.REACT_APP_CLOUDINARY_CLOUD!, process.env.REACT_APP_CLOUDINARY_PRESET!, onSuccess)}
      />
    </StyledImageUploader>
  )
};

export default withRouter(ImageUploader)