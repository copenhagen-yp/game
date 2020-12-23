import React, { FC } from 'react';
import styles from './button.pcss';
import classNames from 'classnames';
import { Props } from "components/button/types";

export const Button: FC<Props> = ({
    children ,
    type,
    disabled,
    color,
    ...restProps
  }) => {

  const classes = classNames(
    styles[type || 'button'],
    color && styles[color]
  )

  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};
