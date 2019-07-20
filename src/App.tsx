import React from 'react';
import AppRouter from "./AppRouter";
import { ThemeProvider, createGlobalStyle, css } from './styled-components'

const theme = {
  lightTextColor: '#747d8c',
  themeColor: '#5f27cd',
  neutralColor: '#f1f2f6',
  errorColor: '#c23616',
  borderRadiusDefault: '0.5rem',
  borderRadiusLarge: '1rem',
  borderColor: '#d1ccc0'
};

const hasMouse = window.matchMedia('@media (pointer: fine)').matches;
const isTouchDevice = ('ontouchstart' in window && !hasMouse);

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lazer84';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  ${(isTouchDevice) && css`
    html,
    body {
      position: fixed;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  `}
`

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRouter/>
      </div>
    </ThemeProvider>
  </>
)

export default App;
