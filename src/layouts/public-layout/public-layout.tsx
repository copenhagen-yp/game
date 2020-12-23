import React from 'react';

import { PublicLayoutType } from './typex';

export const PublicLayout = ({ children }: PublicLayoutType) => {
  return (
    <div>
      <h1>PublicLayout</h1>
      {children}
    </div>
  );
}
