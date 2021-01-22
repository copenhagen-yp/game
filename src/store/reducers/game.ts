import { GAME_ACTIONS } from '../constants';
import { GameReducer } from './types';

const defaultState: GameReducer = {
  status: 'resume',
};

export const gameReducer = (state: GameReducer = defaultState, { type }: {type: string}): GameReducer => {
  switch (type) {
    case GAME_ACTIONS.PAUSE:
      return {
        ...state,
        status: 'pause',
      }

    case GAME_ACTIONS.RESUME:
      return {
        ...state,
        status: 'resume',
      }

    case GAME_ACTIONS.FINISH:
      return {
        ...state,
        status: 'finish',
      }

    case GAME_ACTIONS.RESTART:
      return {
        ...state,
        status: 'restart',
      }

    default:
      return state;
  }
}
