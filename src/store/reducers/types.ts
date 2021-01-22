import { IUser } from '../types';

type LoadStatus = 'success' | 'pending' | 'failed';

export interface ItemActionType {
  type?: string,
  item?: IUser
}

export type UserReducer = {
  status: LoadStatus | null,
  item: IUser
};

export type GameReducer = {
  status: 'pause' | 'resume' | 'finish' | 'restart'
}
