import { combineReducers } from 'redux';

import { userReducer } from './user/reducer';
import { gameReducer } from './reducers/game';
import { GameReducer } from './reducers/types';
import { UserReducer } from './user/types';

export type AppState = {
  user: UserReducer,
  game: GameReducer
}

export const reducers = combineReducers<AppState>({
  user: userReducer,
  game: gameReducer,
});
