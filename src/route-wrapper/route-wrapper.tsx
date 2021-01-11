import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapperType } from './types';

export const RouteWrapper = ({
  component: Component,
  layout: Layout,
  exact,
  ...rest
}: RouteWrapperType) => {
  return (
    <Route
      exact={exact}
      {...rest}
      render={(props) =>
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      } />
  );
};
