import * as React from 'react'
import { RouteComponentProps, withRouter} from 'react-router-dom'
import styled from '../styled-components'
import ImageEditor from "../components/ImageEditor";

const StyledEditor = styled.main`
  height: 100%;
`;

const Edit: React.SFC<RouteComponentProps> = ({ location, history }) => {
  if (!location.state || !location.state.imgData) {
    history.push('/');
    return null
  }

  return (
    <StyledEditor>
      <ImageEditor imgData={location.state.imgData}/>
    </StyledEditor>
  )
};

export default withRouter(Edit)