import { USER } from './constants';
import { IUser } from './types';

export const setFailedStatus = () => ({
  type: USER.SET_FAILED_STATUS,
});

export const setSuccessStatus = () => ({
  type: USER.SET_SUCCESS_STATUS,
});

export const setUserInfo = (userInfo: IUser | null) => ({
  type: USER.SET_USER_INFO,
  payload: {
    userInfo
  },
});

export const logoutUser = () => {
  return {
    type: USER.LOGOUT,
  };
};

export const setPointUser = (point: number) => {
  return {
    type: USER.SET_POINT,
    payload: {
      point
    }
  };
};

export const setTheme = (theme: string) => {
  return {
    type: USER.SET_THEME,
    payload: theme
  };
};
