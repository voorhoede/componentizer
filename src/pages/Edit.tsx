import * as React from 'react'
import { RouteComponentProps, withRouter} from 'react-router-dom'
import styled from '../styled-components'
import ImageEditor from "../components/ImageEditor";

const StyledEditor = styled.main`
  height: 100%;
`;

const Edit: React.SFC<RouteComponentProps> = ({ location, history }) => {
  location = {
    pathname: '',
    search: '',
    hash: '',
    state: {
      imgUrl: 'https://res.cloudinary.com/dkmhierrx/image/upload/v1546522157/componetizer/dcrxqmyz4sao8a5fwcif.png'
    }
  };

  if (!location.state || !location.state.imgUrl) {
    history.push('/');
    return null
  }

  return (
    <StyledEditor>
      <ImageEditor imgUrl={location.state.imgUrl}/>
    </StyledEditor>
  )
};

export default withRouter(Edit)