import React from 'react';

import { PrivateLayoutType } from './types';

export const PrivateLayout = ({ children }: PrivateLayoutType) => {
  return (
    <div>
      <h1>PrivateLayout</h1>
      { children}
    </div>
  );
}
