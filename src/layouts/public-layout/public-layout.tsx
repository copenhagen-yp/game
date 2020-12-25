import React from 'react';

import { PublicLayoutType } from './types';

import styles from './public-layout.pcss';

export const PublicLayout = ({ children }: PublicLayoutType) => {
  return (
  <div className={styles.layout}>
    {children}
  </div>
  );
}
