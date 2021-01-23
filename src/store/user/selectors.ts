import { UserReducer } from './types';

export const getCurrent = ({ user }: { user: UserReducer}) => {
  return user.userInfo;
};
