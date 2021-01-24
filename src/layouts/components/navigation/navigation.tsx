import { Link } from 'react-router-dom';
import React from 'react';

import { routes } from './../../../routes';

import styles from './navigation.pcss';

export const Navigation = () => {
  const menu = [
    {
      label: 'SignIn',
      path: routes.signIn.path,
    },
    {
      label: 'SignUp',
      path: routes.signUp.path,
    },
    {
      label: 'Home',
      path: routes.home.path,
    },
    {
      label: 'Game',
      path: routes.game.path,
    },
    {
      label: 'Leaderboard',
      path: routes.leaderboard.path,
    },
    {
      label: 'Forums',
      path: routes.forums.path,
    },
  ];

  return (
    <ul className={styles.menu}>
      { menu.map((item: any) => (
        <li className={styles.item} key={item.path}>
          <Link to={item.path}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};
