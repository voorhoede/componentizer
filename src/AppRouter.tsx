import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './pages/Index'
import Edit from './pages/Edit'

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Route path="/" exact component={Index} />
      <Route path="/edit/" component={Edit} />
    </React.Fragment>
  </Router>
);

export default AppRouter;