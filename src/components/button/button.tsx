import React, { FC } from 'react';
import cn from 'classnames';

import { Props } from 'components/button/types';

import styles from './button.pcss';

export const Button: FC<Props> = ({
    children ,
    tagType,
    ...restProps
  }) => {
  const Tag = tagType === 'link' ? 'a' : 'button';

  return (
    <Tag className={cn(styles.button, { [styles.link]: tagType === 'link' })} {...restProps}>
      {children}
    </Tag>
  );
};
