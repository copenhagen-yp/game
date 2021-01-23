export interface IUser {
  id?: number,
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login?: string,
  email?: string,
  phone?: string,
  avatar?: string
}

export type LoadStatus = 'success' | 'failed';

export type TPayload = {
  userInfo: IUser | null,
};

export interface ItemActionType {
  type?: string,
  payload?: TPayload,
}

export type UserReducer = {
  status: LoadStatus | null,
  userInfo: IUser | null,
};


