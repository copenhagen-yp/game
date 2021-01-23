import React, { FC } from 'react';
import cn from 'classnames';

import { formProps } from './types';
import styles from './form.pcss';
import { Button } from '../../components';

export const Form: FC<formProps> = (props) => {
  const {
    children,
    wrapperClassName,
    formClassName,
    onSubmit,
    title,
    submitButtonText,
  } = props;

  return (
    <div className={cn(styles.form__wrapper, wrapperClassName && wrapperClassName)}>
      <form onSubmit={onSubmit} className={cn(styles.form, formClassName && formClassName)}>
        <div className={styles.form__header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.form__body}>
          {children}
        </div>
        <div className={styles.form__footer}>
          <Button>{submitButtonText}</Button>
        </div>
      </form>
    </div>
  );
};
