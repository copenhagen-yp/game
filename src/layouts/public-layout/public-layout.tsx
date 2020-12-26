import React from 'react';

import { PublicLayoutType } from './types';

export const PublicLayout = ({ children }: PublicLayoutType) => {
  return (
    <div>
      <h1>PublicLayout</h1>
      {children}
    </div>
  );
}
