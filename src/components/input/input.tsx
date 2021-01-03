import React, { FC } from 'react';
import cn from 'classnames';

import { Props } from './types';
import styles from './input.pcss';


export const Input: FC<Props> = (props) => {
  const { isError, ...restProps } = props;

  return (
    <input 
      className={cn(styles.input, isError && styles.input_type_error)} 
      {...restProps}
    />);
};
