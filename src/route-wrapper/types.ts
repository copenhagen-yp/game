import { ComponentType } from 'react';
import { RouteProps } from 'react-router-dom';

export type RouteWrapperType = {
  component: ComponentType<RouteProps>,
  layout: ComponentType<RouteProps>,
  path: string,
  exact?: boolean,
  isPrivate: boolean,
}

export type withAccessType = {
  component: ComponentType<RouteProps>,
  isPrivate: boolean,
}
