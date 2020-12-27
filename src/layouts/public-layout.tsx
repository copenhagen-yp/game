import React from 'react';

import { LayoutType } from './types';

import styles from './layout.pcss';

export const PublicLayout = ({ children }: LayoutType) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}
