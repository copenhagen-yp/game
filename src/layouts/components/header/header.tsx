import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';

import { routes } from '../../../routes';
import styles from './header.pcss';
import { Navigation } from '../navigation';

import * as userSelectors from '../../../store/user/selectors';
import { Button } from '../../../components';
import { API_URL, REQUEST_METHOD } from '../../../constants';
import * as userActions from '../../../store/user/actions';
import { useHttp } from '../../../hooks';

export const Header = withStyles(styles)(() => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.getCurrent);

  const handleClickLogout = () => {
    request(API_URL.LOGOUT, { method: REQUEST_METHOD.POST })
      .then(() => {
        dispatch(userActions.logoutUser());
      });
  };

  return (
    <div className={styles.header}>
      <a href={routes.home.path}>Лого</a>
      <Navigation />
      <Button onClick={handleClickLogout}>
        Выйти
      </Button>

      <Link to={routes.profile.path}>Профиль {user?.first_name}</Link>
    </div>
  );
});
