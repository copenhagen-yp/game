import React, { FC } from 'react';
import cn from 'classnames';

import { Props } from 'components/button/types';

import styles from './button.pcss';

export const Button: FC<Props> = (props) => {
  const {
    children,
    viewType,
    className,
    ...restProps
  } = props;

  return (
    <button
      className={cn(
        styles.button,
        viewType && styles[viewType],
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
