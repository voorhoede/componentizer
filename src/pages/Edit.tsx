import * as React from 'react'
import { RouteComponentProps, withRouter} from 'react-router-dom'
import styled from '../styled-components'
import ImageEditor from "../components/ImageEditor";

const StyledEditor = styled.main`
  height: 100%;
`;

const Edit: React.SFC<RouteComponentProps> = ({ location, history }) => {
  if (!location.state || !location.state.imgUrl) {
    history.push('/');
    return <></>
  }

  return (
    <StyledEditor>
      <ImageEditor imgUrl={location.state.imgUrl}/>
    </StyledEditor>
  )
};

export default withRouter(Edit)