import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import store from '../store';

// Component Lazy Loading to be used in react-router
export const waitingComponent = Component => props => (
  <Suspense fallback={<Spin />}>
    <Component {...props} />
  </Suspense>
);

// Private route
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = store.getState();

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
};
