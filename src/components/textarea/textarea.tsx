import React, { FC } from 'react';
import cn from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

import { Props } from './types';
import styles from './textarea.pcss';


export const Textarea: FC<Props> = withStyles(styles)((props: Props) => {
  const { error, name, placeholder, value, className, onChange, onBlur, ...restProps } = props;

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={cn(styles.textarea, error?.value && styles.textarea_type_error, className)}
      {...restProps}
    />);
});
