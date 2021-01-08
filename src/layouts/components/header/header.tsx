import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../../routes';
import styles from './header.pcss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <a href={routes.home.path}>Лого</a>
      <Link to={routes.profile.path}>Профиль</Link>
    </div>
  );
};
