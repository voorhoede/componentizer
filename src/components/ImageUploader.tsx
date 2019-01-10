import * as React from 'react';
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from "react-router";
import FilePond from './FilePond';
import styled from '../styled-components'
import createCloudinary from '../lib/createCloudinary'

export interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
}

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/svg', 'image/gif']

const StyledImageUploader = styled.div`
  width: 100%;
  max-width: 25rem;
  min-height: 4.75rem;
  border-radius: ${props => props.theme.borderRadiusLarge};
  overflow: hidden;
  background: #f1f0ef;
  
  .filepond--root {
    margin-bottom: 0;
  }
`;

const PlaceHolder = styled.div`
  width: 100%;
  height: 4.75rem;
`;

const ImageUploader = ({ history }: RouteComponentProps) => {
  function onSuccess(imgData: CloudinaryImage) {
    history.push('/edit', { imgData })
  }

  return (
    <StyledImageUploader>
      <React.Suspense fallback={<PlaceHolder />}>
        <FilePond
          allowMultiple={false}
          server={createCloudinary(process.env.REACT_APP_CLOUDINARY_CLOUD!, process.env.REACT_APP_CLOUDINARY_PRESET!, onSuccess)}
          acceptedFileTypes={acceptedFileTypes}
          accept={acceptedFileTypes.join()}
        />
      </React.Suspense>
    </StyledImageUploader>
  )
};

export default withRouter(ImageUploader)