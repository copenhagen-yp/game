import React from 'react';
import cn from 'classnames';

import { ToastProps } from 'react-toast-notifications';

import styles from './toast.pcss';

export const Toast = ({ appearance, children, onDismiss }: ToastProps) => {
  const handleClickClose = () => {
    onDismiss()
  };

  return (
    <div className={cn(styles.toast, styles[`toast_${appearance}`])}>
      {children}
      <button
        className={styles.closeButton}
        onClick={handleClickClose}
      >
        {/*ToDO: change to icon*/}
        x
      </button>
    </div>
  );
}
