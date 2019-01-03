import React, { Component } from 'react';
import ImageUploader from './components/ImageUploader'
import AppRouter from "./AppRouter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter/>
      </div>
    );
  }
}

export default App;
