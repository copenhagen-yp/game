import React from 'react';

import { Header } from './components/header';
import { PrivateLayoutType } from './types';

import styles from './private-layout.pcss';

export const PrivateLayout = ({ children }: PrivateLayoutType) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        { children}
      </div>
    </div>
  );
}
