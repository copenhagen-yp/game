import { UserReducer, ItemActionType } from './types';
import { USER } from './constants';

const defaultReducer: UserReducer = {
  status: null,
  userInfo: null,
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
    default:
      return state;
  }
};
