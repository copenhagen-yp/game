import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapperType } from './types';

import { withAccess } from './withAccess';

export const RouteWrapper = ({
  component: Component,
  layout: Layout,
  exact,
  isPrivate,
  ...rest
}: RouteWrapperType) => {
  const RouteComponent = withAccess(Layout);

  return (
    <Route
      exact={exact}
      {...rest}
      render={(...restProps) => (
        <RouteComponent
          component={Component}
          isPrivate={isPrivate}
          {...restProps}
        />)}
    />
  );
};
