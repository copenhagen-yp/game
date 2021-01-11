import React, { FC } from 'react';
import cn from 'classnames';

import { Props } from './types';
import styles from './input.pcss';


export const Input: FC<Props> = (props) => {
  const { error, name, placeholder, value, className, type, onChange, onBlur, ...restProps } = props;

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={cn(styles.input, error?.value && styles.input_type_error, className)}
      {...restProps}
    />);
};
