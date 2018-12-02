import React, { Suspense } from 'react';
import { Spin } from 'antd';

// Component Lazy Loading to be used in react-router
// eslint-disable-next-line import/prefer-default-export
export const waitingComponent = Component => props => (
  <Suspense fallback={<Spin />}>
    <Component {...props} />
  </Suspense>
);
