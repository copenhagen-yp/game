import React, { FC } from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './field.pcss';

export const Field: FC<Props> = (props) => {
  const { children, label, error, className } = props;
    
  return (
    <div className={classNames(styles.field, className)}>
      <label className={styles.field__label}>{label}</label>
      {children}
      {error?.value ? <span className={styles.error}>{error?.text || 'Поле обязательно для заполнения'}</span> : null}
    </div>
  )
};
