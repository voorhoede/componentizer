import * as React from 'react'
import styled from '../styled-components'

interface ImageEditorProps {
  imgUrl: string
}

const StyledImageEditor = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ImageEditor: React.SFC<ImageEditorProps> = ({ imgUrl }) => {
  return (
    <StyledImageEditor>
      <img src={imgUrl} alt=""/>
    </StyledImageEditor>
  )
};

export default ImageEditor