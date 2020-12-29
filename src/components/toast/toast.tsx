import React from 'react';
import cn from 'classnames';

import { ToastProps } from 'react-toast-notifications';

import { Button } from '../../components';

import styles from './toast.pcss';

export const Toast = ({ appearance, children, onDismiss }: ToastProps) => {
  const handleClickClose = () => {
    onDismiss()
  };

  return (
    <div className={cn(styles.toast, styles[`toast_${appearance}`])}>
      {children}
      <Button
        type='button'
        viewType='icon'
        className={styles.closeButton}
        onClick={handleClickClose}
      >
        {/*ToDO: change to icon*/}
        x
      </Button>
    </div>
  );
}