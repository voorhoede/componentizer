import * as React from 'react'
import styled from '../styled-components'
import GridRider from '../components/GridRider'
import Page from '../components/styled-components/Page'
import Title, { OldSchoolTitle } from '../components/styled-components/Title'
import ImageUploader from '../components/ImageUploader'

const IndexStyles = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`

const Credits = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 2rem;
  color: ${(props) => props.theme.lightTextColor};
  text-align: center;

  a {
    color: ${(props) => props.theme.lightTextColor};
  }
`

const Index = () => (
  <Page>
    <IndexStyles>
      <OldSchoolTitle>Componentizer</OldSchoolTitle>
      <Title as="h2">
        Upload your image{' '}
        <span role="img" aria-label="camera">
          📸
        </span>
      </Title>
      <ImageUploader />
      <Credits>
        <p>
          <span role="img" aria-label="lightning">
            ⚡️
          </span>{' '}
          by <a href="https://github.com/sjoerdbeentjes">@sjoerdbeentjes</a>,{' '}
          <a href="https://www.voorhoede.nl">De Voorhoede</a>
        </p>
        <p>
          See project on{' '}
          <a href="https://github.com/voorhoede/componentizer">Github</a>
        </p>
      </Credits>
      <GridRider />
    </IndexStyles>
  </Page>
)

export default Index
