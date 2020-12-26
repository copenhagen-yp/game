import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapperType } from './types';

export const RouteWrapper = ({
  component: Component,
  layout: Layout,
  ...rest
}: RouteWrapperType) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      } />
  );
};
