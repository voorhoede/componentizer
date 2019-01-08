import * as React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import styled from '../styled-components'
import ImageEditor from "../components/ImageEditor";
import Button from '../components/styled-components/Button';

const StyledEditor = styled.div`
  height: 100%;
`;

const  BackButton = styled(Button)`
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 200;
`;

const Edit = ({ location, history }: RouteComponentProps) => {
  if (!location.state || !location.state.imgData) {
    history.push('/');
    return null
  }

  return (
    <StyledEditor>
      <Link to=""><BackButton>👈</BackButton></Link>
      <ImageEditor imgData={location.state.imgData}/>
    </StyledEditor>
  )
};

export default withRouter(Edit)