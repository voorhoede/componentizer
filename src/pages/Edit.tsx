import * as React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { StaticContext } from 'react-router';
import styled from '../styled-components'
import ImageEditor from "../components/ImageEditor";
import Button from '../components/styled-components/Button';
import { CloudinaryImage } from '../components/ImageUploader';

const StyledEditor = styled.div`
  height: 100%;
`;

const  BackButton = styled(Button)`
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 200;
`;

type LocationState = {
    imgData: CloudinaryImage
};

const Edit = ({ location, history }: RouteComponentProps<{}, StaticContext, LocationState>) => {
  if (!location.state || !location.state.imgData) {
    history.push('/');
    return null
  }

  return (
    <StyledEditor>
      <Link to="">
        <BackButton>
          <span role="img" aria-label="hand pointing left">👈</span><span className="a11y-sr-only">Back to home</span>
        </BackButton>
      </Link>
      <ImageEditor imgData={location.state.imgData}/>
    </StyledEditor>
  )
};

export default withRouter(Edit)
