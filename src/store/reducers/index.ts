import { combineReducers } from 'redux';

import { userReducer } from './user';
import { gameReducer } from './game';
import { GameReducer, UserReducer } from './types';

export type AppState = {
  user: UserReducer,
  game: GameReducer
}

export const reducers = combineReducers<AppState>({
  user: userReducer,
  game: gameReducer,
});
