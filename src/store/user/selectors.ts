import { UserReducer } from './types';

export const getCurrent = ({ user }: { user: UserReducer}) => {
  return user.userInfo;
};

export const getGameInfo = ({ user }: { user: UserReducer}) => {
  return user.gameInfo;
};
