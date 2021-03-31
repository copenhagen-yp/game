import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Header } from './components/header';
import { LayoutType } from './types';

import styles from './layout.pcss';

export const PrivateLayout = withStyles(styles)(({ children }: LayoutType) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        { children}
      </div>
    </div>
  );
});
