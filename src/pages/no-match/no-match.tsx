import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import { routes } from '../../routes';

import { Button } from '../../components';

import styles from './no-match.pcss';

export const NoMatch = withStyles(styles)(() => {
  const location = useLocation();

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          404
        </h1>
        <p className={styles.description}>
          Страницы <b>{location.pathname}</b> не существует, перейдите на главную страницу
        </p>

        <Link to={routes.home.path}>
          <Button>
          Главная страница
          </Button>
        </Link>
      </div>
    </div>
  );
});
