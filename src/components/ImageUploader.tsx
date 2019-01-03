import * as React from 'react';
const { FilePond } = require('react-filepond');
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from "react-router";
import styled from '../styled-components'
import 'filepond/dist/filepond.min.css';
import createCloudinary from '../lib/createCloudinary'

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
  const [imgUrl, setImgUrl] = React.useState(null);

  React.useEffect(() => {
    if (imgUrl) {
      history.push('/edit', { imgUrl })
    }
  });

  return (
    <StyledImageUploader>
      { imgUrl }
      <FilePond
        allowMultiple={false}
        server={createCloudinary('dkmhierrx', 'componetizer', setImgUrl)}
      />
    </StyledImageUploader>
  )
};

export default withRouter(ImageUploader)