import { Link } from 'react-router-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { routes } from './../../../routes';

import styles from './navigation.pcss';

export const Navigation = withStyles(styles)(() => {
  const menu = [
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
    {
      label: 'Feedback',
      path: routes.feedback.path,
    },
  ];

  return (
    <ul className={styles.menu}>
      { menu.map((item: any) => (
        <li className={styles.item} key={item.path}>
          <Link className={styles.link} to={item.path}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
});
