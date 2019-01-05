import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './pages/Index';
import Edit from './pages/Edit'

// const Index = React.lazy(() => import('./pages/Index'))
// const Edit = React.lazy(() => import('./pages/Edit'))

const AppRouter = () => (
  // <React.Suspense fallback={<p>Loading...</p>} >
    <Router>
      <React.Fragment>
        <Route path="/" exact component={() => <Index />} />
        <Route path="/edit/" component={() => <Edit />} />
      </React.Fragment>
    </Router>
  // </React.Suspense>
);

export default AppRouter;