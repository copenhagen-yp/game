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

export type Themes = 'dark' | 'light';

export type TGameInfo = {
  point: number,
};

export type LoadStatus = 'success' | 'failed';

export type TPayload = {
  userInfo?: IUser | null,
};
export interface ItemActionType {
  type?: string,
  payload?: TPayload & TGameInfo & Themes,
}

export type UserReducer = {
  status: LoadStatus | null,
  theme: Themes;
  userInfo: IUser | null,
  gameInfo: TGameInfo
};
