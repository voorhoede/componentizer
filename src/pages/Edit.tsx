import * as React from 'react'
import { RouteComponentProps, withRouter} from 'react-router-dom'

const Edit: React.SFC<RouteComponentProps> = ({ location, history }) => {
  if (!location.state || !location.state.imgUrl) {
    history.push('/');
    return <></>
  }

  return (
    <div>
      <img src={location.state.imgUrl} alt="screenshot"/>
    </div>
  )
};

export default withRouter(Edit)