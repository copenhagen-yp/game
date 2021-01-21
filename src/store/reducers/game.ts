import { GAME_ACTIONS } from '../constants';

const defaultState = {
  status: 'resume',
};

export const gameReducer = (state = defaultState, { type }: {type: string}) => {
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

    default:
      return state;
  }
}
