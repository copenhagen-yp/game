import { USER } from '../constants';
import { IUser } from '../types'; 

export const actionUserPending = () => ({
  type: USER.PENDING
});

export const actionUserSuccess = () => ({
  type: USER.SUCCESS
});

export const actionUserFailed = () => ({
  type: USER.FAILED
});

export const actionUserSetUserItem = (item: IUser) => ({
  type: USER.SET_USER_ITEM,
  item
});