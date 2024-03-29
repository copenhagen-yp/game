import { UserReducer, ItemActionType, Themes } from './types';
import { USER } from './constants';

export const defaultReducer: UserReducer = {
  status: null,
  userInfo: null,
  theme: Themes.light,
  gameInfo: {
    point: 0
  },
};

export const userReducer = (state: UserReducer = defaultReducer, { type, payload }: ItemActionType)
  : UserReducer => {
  switch (type) {
    case USER.SET_FAILED_STATUS:
      return {
        ...state,
        status: 'failed',
      };
    case USER.SET_SUCCESS_STATUS:
      return {
        ...state,
        status: 'success',
      };
    case USER.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload?.userInfo || null,
      };
    case USER.LOGOUT:
      return {
        ...state,
        userInfo: null,
      };
    case USER.SET_THEME:
      return {
        ...state,
        theme: payload || state.theme,
      };
    case USER.SET_POINT:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          point: payload?.point || 0,
        }
      };
    default:
      return state;
  }
};
