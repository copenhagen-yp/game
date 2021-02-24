import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, userSelectors } from '../../store/user';
import s from './button-change-themes.pcss';

export const ButtonChangeThemes = withStyles(s)(() => {
  const dispatch = useDispatch();
  const theme = useSelector(userSelectors.getTheme);

  const handleClickLight = () => {
    dispatch(userActions.setTheme('light'));
  };

  const handleClickDark = () => {
    dispatch(userActions.setTheme('dark'));
  };
  
  return (
    <div className={s.wrapper__button}>
      {theme === 'dark' ? (<div onClick={handleClickLight} className={s.button_light}>
        LIGHT
      </div>)
        : (<div onClick={handleClickDark} className={s.button_dark}>
        DARK
        </div>)}
    </div>
  );
});
