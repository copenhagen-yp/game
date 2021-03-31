import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { LayoutType } from './types';

import styles from './layout.pcss';

export const PublicLayout = withStyles(styles)(({ children }: LayoutType) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
});
