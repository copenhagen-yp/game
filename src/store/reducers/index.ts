import { combineReducers } from 'redux';

import { userReducer } from './user';
import { gameReducer } from './game';

export const reducers = combineReducers({
  user: userReducer,
  game: gameReducer,
});
