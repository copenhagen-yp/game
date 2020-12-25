import { ComponentType, ReactNode } from 'react';
import { RouteProps } from "react-router-dom";

export type RouteWrapperType = {
  component: ComponentType<RouteProps>,
  layout: ReactNode,
  path: string,
}