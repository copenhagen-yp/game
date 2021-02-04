import React, { ComponentType } from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as userSelectors from '../store/user/selectors';

import { routes } from '../routes';

import { withAccessType } from './types';

export const withAccess = (layout: ComponentType<RouteProps>) => {
  const AccessComponent = ({ component, isPrivate, ...restProps } : withAccessType) => {
    const user = useSelector(userSelectors.getCurrent);

    if(isPrivate && !user) {
      return <Redirect to={routes.signIn.path} />;
    }

    if(!isPrivate && user) {
      return <Redirect to={routes.home.path} />;
    }

    const Layout = layout;
    const Component = component;

    return (
      <Layout {...restProps}>
        <Component {...restProps}/>
      </Layout>
    );
  };

  return AccessComponent;
};
