import React, { Component } from 'react';
import ImageUploader from './components/ImageUploader'
import AppRouter from "./AppRouter";
import { ThemeProvider } from './styled-components'

const theme = {
  themeColor: '#5f27cd',
  neutralColor: '#f1f2f6',
  errorColor: '#c23616',
  borderRadiusDefault: '0.5rem',
  borderRadiusLarge: '1rem',
  borderColor: '#d1ccc0'
};

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <AppRouter/>
    </div>
  </ThemeProvider>
)

export default App;
