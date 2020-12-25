import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapperType } from './types';

export const RouteWrapper = ({
                               component: Component,
                               layout: Layout,
                               ...rest
                             }: RouteWrapperType) => {
  // @ts-ignore
  // @ts-ignore
  return (
    <Route
      {...rest}
      render={(props) =>
        // @ts-ignore
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      } />
  );
};
