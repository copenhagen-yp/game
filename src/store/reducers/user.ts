import { UserReducer, ItemActionType } from './types';
import { USER } from '../constants';

const defaultReducer: UserReducer = {
  status: null,
  item: {},
};

export const userReducer = (state: UserReducer = defaultReducer, { type, item = {} }: ItemActionType): UserReducer => {
  switch (type) {
    case USER.PENDING:
      return {
        ...state,
        status: 'pending',
      };
    case USER.SUCCESS:
      return {
        ...state,
        status: 'success',
      };
    case USER.FAILED:
      return {
        ...state,
        status: 'failed',
      };
    case USER.SET_USER_ITEM:
      return {
        ...state,
        item,
      };
    default:
      return state;
  }
};