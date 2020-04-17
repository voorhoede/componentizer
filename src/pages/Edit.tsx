import * as React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { useParams } from 'react-router'
import styled from '../styled-components'
import ImageEditor from '../components/ImageEditor'
import Button from '../components/styled-components/Button'
import { CloudinaryImage } from '../components/ImageUploader'
import useImageInfo from '../lib/useImageInfo'

const StyledEditor = styled.div`
  height: 100%;
`

const BackButton = styled(Button)`
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 200;
`

type LocationState = {
  imgData: CloudinaryImage
}

const Edit = ({ location, history }: RouteComponentProps<{ id: string }>) => {
  const params = useParams<{ id: string }>()
  const imgData = useImageInfo(params.id)

  return (
    <StyledEditor>
      <Link to="">
        <BackButton>
          <span role="img" aria-label="hand pointing left">
            👈
          </span>
          <span className="a11y-sr-only">Back to home</span>
        </BackButton>
      </Link>
      {imgData && <ImageEditor imgData={imgData} />}
    </StyledEditor>
  )
}

export default withRouter(Edit)
