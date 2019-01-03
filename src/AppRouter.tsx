import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './pages/Index'
import About from './pages/About'

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
    </React.Fragment>
  </Router>
);

export default AppRouter;