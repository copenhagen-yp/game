import React from 'react';

import { Header } from './components/header';
import { Navigation } from './components/navigation';
import { LayoutType } from './types';

import styles from './layout.pcss';

export const PrivateLayout = ({ children }: LayoutType) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Navigation />
      <div className={styles.container}>
        { children}
      </div>
    </div>
  );
};
