import { GAME_ACTIONS, GAME_STATUSES } from './constants';
import { GameReducer } from './types';

const defaultState: GameReducer = {
  status: 'resume',
};

export const gameReducer = (state: GameReducer = defaultState, { type }: {type: string}): GameReducer => {
  switch (type) {
    case GAME_ACTIONS.PAUSE:
      return {
        ...state,
        status: GAME_STATUSES.PAUSE,
      };

    case GAME_ACTIONS.RESUME:
      return {
        ...state,
        status: GAME_STATUSES.RESUME,
      };

    case GAME_ACTIONS.FINISH:
      return {
        ...state,
        status: GAME_STATUSES.FINISH,
      };

    case GAME_ACTIONS.RESTART:
      return {
        ...state,
        status: GAME_STATUSES.RESTART,
      };

    default:
      return state;
  }
};
