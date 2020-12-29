import React, { FC } from 'react';
import classNames from 'classnames';

import { Props } from './types';
import styles from './input.pcss';


export const Input: FC<Props> = (props) => {
  const { isError } = props;

  return (<input 
    className={classNames(styles.input, isError && styles.input_type_error)} 
    {...props}/>);
};
