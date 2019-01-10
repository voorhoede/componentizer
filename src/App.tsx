import React from 'react';
import AppRouter from "./AppRouter";
import { ThemeProvider, createGlobalStyle, css } from './styled-components'

const theme = {
  themeColor: '#5f27cd',
  neutralColor: '#f1f2f6',
  errorColor: '#c23616',
  borderRadiusDefault: '0.5rem',
  borderRadiusLarge: '1rem',
  borderColor: '#d1ccc0'
};

const GlobalStyle = createGlobalStyle`
  ${'ontouchstart' in window && css`
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
