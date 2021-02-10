import React from 'react';
import cn from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

import { ToastProps } from 'react-toast-notifications';

import { Button } from '../../components';

import styles from './toast.pcss';

export const Toast = withStyles(styles)(({ appearance, children, onDismiss }: ToastProps) => {
  return (
    <div className={cn(styles.toast, styles[`toast_${appearance}`])}>
      {children}
      <Button
        type='button'
        viewType='icon'
        className={styles.closeButton}
        onClick={onDismiss}
      >
        {/*ToDO: change to icon*/}
        x
      </Button>
    </div>
  );
});
