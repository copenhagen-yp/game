import React, { FC } from 'react';
import styles from './button.pcss';

type Props = {
  className?: string;
  text: string;
  onClick: () => void;
};

export const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
