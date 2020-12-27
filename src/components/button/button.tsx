import React, { FC } from 'react';
import cn from 'classnames';

import { Props } from 'components/button/types';

import styles from './button.pcss';

export const Button: FC<Props> = (props) => {
  const {
    children,
    viewType,
    ...restProps
  } = props;

  return (
    <button
      className={cn(styles.button, viewType && styles[viewType])}
      {...restProps}
    >
      {children}
    </button>
  );
};
