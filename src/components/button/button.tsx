import React, { FC } from 'react';
import cn from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Props } from 'components/button/types';

import styles from './button.pcss';

export const Button: FC<Props> = withStyles(styles)((props: Props) => {
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
});
