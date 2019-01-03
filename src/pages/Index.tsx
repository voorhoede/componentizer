import * as React from 'react'
import styled from '../styled-components'
import Page from '../components/styled-components/Page'
import Title from '../components/styled-components/Title'
import ImageUploader from "../components/ImageUploader";

const IndexStyles = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const Index: React.SFC<{}> = () => {
  return (
    <Page>
      <IndexStyles>
        <Title large>Upload your screenshot 📸</Title>
        <ImageUploader/>
      </IndexStyles>
    </Page>
  )
};

export default Index