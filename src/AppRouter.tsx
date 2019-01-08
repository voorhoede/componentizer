import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Index = React.lazy(() => import('./pages/Index'))
const Edit = React.lazy(() => import('./pages/Edit'))

const AppRouter = () => (
  <React.Suspense fallback={null}>
    <Router>
      <>
        <Route path="/" exact component={() => <Index />} />
        <Route path="/edit/" component={() => <Edit />} />
      </>
    </Router>
  </React.Suspense>
);

export default AppRouter;