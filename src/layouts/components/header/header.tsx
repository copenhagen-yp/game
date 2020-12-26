import React from 'react';

import { routes } from '../../../routes';

import styles from './header.pcss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <a href={routes.home.path}>Лого</a>
      <button
        type="button"
      >
        Профиль
      </button>
    </div>
  );
};
