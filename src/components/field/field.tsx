import React, { FC } from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './field.pcss';

export const Field: FC<Props> = (props) => {
  const { children, label, isError, className } = props;
    
  return (
    <div className={classNames(styles.field, className)}>
      <label className={styles.field__label}>{label}</label>
      {children}
      {isError ? <span className={styles.error}>Поле обязательно для заполнения</span> : null}
    </div>
  )
};
