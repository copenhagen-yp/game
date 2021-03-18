import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, userSelectors, userTypes } from '../../store/user';
import { useHttp } from '../../hooks/useHttp';
import { API_DOMAIN_SERVER } from '../../constants';
import { themeApi } from '../../api';
import styles from './button-change-themes.pcss';

export const ButtonChangeThemes = withStyles(styles)(() => {
  const dispatch = useDispatch();
  const theme = useSelector(userSelectors.getTheme);

  const { request } = useHttp(API_DOMAIN_SERVER);
  const { setTheme } = themeApi(request);

  const handleChangeTheme = (theme) => {
    setTheme(theme)
      .then(() => {
        dispatch(userActions.setTheme(theme));
      });
  };

  const handleClickLight = () => {
    handleChangeTheme(userTypes.Themes.light);
  };

  const handleClickDark = () => {
    handleChangeTheme(userTypes.Themes.dark);
  };

  return (
    <div className={styles.wrapper__button}>
      {theme === userTypes.Themes.dark ? (<div onClick={handleClickLight} className={styles.button_light}>
        LIGHT
      </div>)
        : (<div onClick={handleClickDark} className={styles.button_dark}>
        DARK
        </div>)}
    </div>
  );
});
